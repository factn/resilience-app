import React, { useState } from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { User } from "../../model";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import RequestForm from "./RequestForm";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { getFirebase, withFirestore } from "react-redux-firebase";
import { v4 as uuidv4 } from "uuid";

/**
 * Component for showing request form in new request
 *
 * @component
 */
function MakeRequest({ history, firestore }) {
  const firebase = getFirebase();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const storage = firebase.storage();
  const { handleChange, values, setValues } = useForm();

  const user = useSelector((state) => state.firebase.auth);
  function getFile(file) {
    setFile(file);
  }

  /**
   * Creates a mission based on form data. Updates the current user
   * to be the owner of the newly created mission.
   */
  function saveMissions() {
    const model = { ...values, ownerId: user.uid };
    const missionId = uuidv4();

    firestore
      .collection("missions")
      .doc(missionId)
      .set({ ...model, status: "todo" });

    User.assignAsOwner(firestore, missionId, user.uid);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (file) {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      await uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          // error function ....
          console.log("error", error);
        },
        async () => {
          const url = await storage.ref("images").child(file.name).getDownloadURL();
          let val = values; // Setting it to be part of the values (setValues), calls it late
          val.url = url; // Todo: Refactor later
          setValues(val);
          saveMissions();
        }
      );
    } else {
      saveMissions();
    }
    history.push("/missions");
    setLoading(false);
  }

  if (loading) return <CircularProgress />;

  return (
    <RequestForm
      values={values}
      onSubmit={onSubmit}
      getFile={getFile}
      handleChange={handleChange}
    />
  );
}

MakeRequest.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
  /**
   * Firebase store
   */
  firestore: PropTypes.object.isRequired,
};

export default withRouter(withFirestore(MakeRequest));
