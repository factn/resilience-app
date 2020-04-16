import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import MissionForm from "./MissionForm";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { getFirebase, withFirestore } from "react-redux-firebase";
import { SuccessSnackbar, ErrorSnackbar } from "../../component/Snackbars";

import { User, Mission } from "../../model";

/**
 * Component for creating a mission based on form data
 *
 * @param {object} props.history - Object obtained from React Router
 */
function MakeMission({ history }) {
  const firebase = getFirebase();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  // const [autoAssignHelper, setAutoAssignHelper] = useState(false);
  const storage = firebase.storage();
  const { handleChange, values } = useForm();

  //Snackbar state
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const user = useSelector((state) => state.firebase.auth);
  function getFile(file) {
    setFile(file);
  }

  /**
   * Creates a mission based on form data.
   */
  async function saveMission(payload) {
    try {
      setLoading(true);
      //Lookup id of helper
      let volunteerId;
      volunteerId = await User.getIdByDisplayName(payload.helper);

      //upload Image to Firebase Cloud Storage
      const imageUrl = await imageUpload();

      //create mission object
      const mission = Mission.load({
        organisationId: "", // PLACEHOLDER -> user doesn'T have an organisation id yet
        volunteerId: volunteerId,
        title: payload.title,
        description: payload.description,
        image: imageUrl,
        pickUpWindow: {
          startTime: payload.pickUp.time,
        },
        pickUpLocation: {
          address: payload.pickUp.location.address,
          lat: payload.pickUp.location.geoLocation?.lat,
          long: payload.pickUp.location.geoLocation?.lng,
        },
        deliveryWindow: {
          startTime: payload.dropOff.time,
        },
        deliveryLocation: {
          address: payload.dropOff.location.address,
          lat: payload.dropOff.location.geoLocation?.lat,
          long: payload.dropOff.location.geoLocation?.lng,
        },
        recipientName: payload.recipient,
      });

      //save mission in firestore
      User.createMission(mission)
        .then(() => {
          setLoading(false);
          setSuccessSnackbarOpen(true);
        })
        .catch((error) => {
          setLoading(false);
          setErrorSnackbarOpen(true);
          console.error(error);
        });
    } catch (error) {
      setLoading(false);
      setErrorSnackbarOpen(true);
      console.error(error);
    }
  }

  async function imageUpload() {
    if (file) {
      const uploadTask = storage
        .ref(`images/${file.name}`)
        .put(file)
        .then((data) => {
          return data.ref.getDownloadURL();
        })
        .catch((error) => {
          throw Error("image upload error");
        });
      return await uploadTask;
    } else {
      return "";
    }
  }

  async function validateAndSaveMission(payload) {
    try {
      const input = { ...payload, ...values };

      /**
       * Validate input
       */
      if (!checkForEmptyInput(input)) {
        saveMission(input);
      } else {
        throw Error("wrong input");
      }
    } catch (error) {
      setErrorSnackbarOpen(true);
      console.error(error);
    }
  }

  function checkForEmptyInput(input) {
    //check for undefined value
    if (
      input.title &&
      input.description &&
      input.recipient &&
      input.helper &&
      input.pickUp.location &&
      input.dropOff.location
    ) {
      return false;
    }
    return true;
  }

  if (loading) return <CircularProgress />;

  return (
    <>
      <MissionForm
        values={values}
        onSubmit={validateAndSaveMission}
        getFile={getFile}
        handleChange={handleChange}
        /*autoAssign={() => setAutoAssignHelper(!autoAssignHelper)}
        autoAssigned={autoAssignHelper}*/
      />
      <ErrorSnackbar
        open={errorSnackbarOpen}
        handleClose={() => setErrorSnackbarOpen(false)}
        errorMessage="Error while creating mission. Please try again."
        autoHideDuration={4000}
      />
      <SuccessSnackbar
        open={successSnackbarOpen}
        handleClose={() => {
          setSuccessSnackbarOpen(false);
          history.push("/missions");
        }}
        successMessage="Mission has been created."
        autoHideDuration={4000}
      />
    </>
  );
}

export default withRouter(withFirestore(MakeMission));
