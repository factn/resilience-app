import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useContext, useState } from "react";
import { getFirebase, withFirestore } from "react-redux-firebase";
import { withRouter } from "react-router-dom";

import useForm from "../../hooks/useForm";
import Snackbar from "../../component/Snackbars";
import { Mission, User } from "../../model";
import MissionForm from "./MissionForm";

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

  const snackbarContext = useContext(Snackbar.Context.SnackbarContext);

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
      let volunteerUid;
      if (!payload.helper) {
        volunteerUid = null;
      } else {
        volunteerUid = await User.getIdByDisplayName(payload.helper);
      }

      //upload Image to Firebase Cloud Storage
      const imageUrl = await imageUpload();

      //create mission object
      const mission = {
        organizationUid: "1", // PLACEHOLDER -> user doesn'T have an organization id yet
        volunteerUid: volunteerUid,
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
      };

      //save mission in firestore
      Mission.create(mission)
        .then(() => {
          setLoading(false);

          snackbarContext.updateSnackbar({
            message: "Successfully created mission",
          });
        })
        .catch((error) => {
          setLoading(false);

          snackbarContext.updateSnackbar({
            message: `Unable to create mission: ${error.message}`,
            type: "error",
          });
        });
    } catch (error) {
      setLoading(false);

      snackbarContext.updateSnackbar({
        message: `Unable to save mission: ${error.message}`,
        type: "error",
      });
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
          snackbarContext.updateSnackbar({
            message: `Unable to upload image: ${error.message}`,
            type: "error",
          });
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
        snackbarContext.updateSnackbar({
          message: "Mission saved!",
        });
      } else {
        throw Error("Wrong input");
      }
    } catch (error) {
      snackbarContext.updateSnackbar({
        message: `Unable to save mission: ${error.message}`,
        type: "error",
      });
    }
  }

  function checkForEmptyInput(input) {
    //check for undefined value
    if (
      input.title &&
      input.description &&
      input.recipient &&
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
    </>
  );
}

export default withRouter(withFirestore(MakeMission));
