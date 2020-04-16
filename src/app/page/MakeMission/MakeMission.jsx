import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import MissionForm from "./MissionForm";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { getFirebase, withFirestore } from "react-redux-firebase";
import {
  Users,
  Missions,
  Mission,
  MissionStatus,
  MissionFundedStatus,
  TimeWindowType,
} from "../../model";
import { SuccessSnackbar, ErrorSnackbar } from "../../component/Snackbars";

function MakeMission({ history, firestore }) {
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
    setLoading(true);
    //Lookup id of helper
    const volunteerId = await Users.getIdByDisplayName(payload.helper);

    //upload Image to Firebase Cloud Storage
    const imageUrl = await imageUpload();

    //create mission object from Mission Class
    const mission = new Mission();
    mission.status = MissionStatus.unassigned;
    mission.fundedStatus = MissionFundedStatus.fundingnotneeded;
    mission.organisationId = user.organisationId;
    mission.volunteerId = volunteerId;
    mission.title = payload.title;
    mission.description = payload.description;
    mission.image = imageUrl;
    mission.pickUpWindow = {
      timeWindowType: TimeWindowType.exact,
      startTime: payload.pickUp.time,
    };
    mission.pickUplocation = {
      address: payload.pickUp.location.address,
      lat: payload.pickUp.location.geoLocation?.lat,
      long: payload.pickUp.location.geoLocation?.lng,
    };
    mission.deliveryWindow = {
      timeWindowType: TimeWindowType.exact,
      startTime: payload.dropOff.time,
    };
    mission.deliverylocation = {
      address: payload.dropOff.location.address,
      lat: payload.dropOff.location.geoLocation?.lat,
      long: payload.dropOff.location.geoLocation?.lng,
    };
    mission.missionAccepted = false;
    mission.recipientName = payload.recipient;
    mission.created = Date.now();
    mission.lastUpdated = Date.now();

    //save mission in firestore
    Missions.create(mission)
      .then(() => {
        setLoading(false);
        setSuccessSnackbarOpen(true);
      })
      .catch((error) => {
        setLoading(false);
        setErrorSnackbarOpen(true);
        console.error(error);
      });
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
      return null;
    }
  }

  async function validateInput(payload) {
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
        onSubmit={validateInput}
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
          history.push("/missions/created");
        }}
        successMessage="Mission has been created."
        autoHideDuration={4000}
      />
    </>
  );
}

export default withRouter(withFirestore(MakeMission));
