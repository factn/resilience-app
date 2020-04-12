import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { User } from "../../model";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import MissionForm from "./MissionForm";
import useForm from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { getFirebase, withFirestore } from "react-redux-firebase";
import { v4 as uuidv4 } from "uuid";

function MakeMission({ history, firestore }) {
  const firebase = getFirebase();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  // const [autoAssignHelper, setAutoAssignHelper] = useState(false);
  const storage = firebase.storage();
  const { handleChange, values, setValues } = useForm();

  const user = useSelector((state) => state.firebase.auth);
  /**
   * Creates a mission based on form data. Updates the current user
   * to be the owner of the newly created mission.
   */
  function saveMissions(payload) {
    console.log("Saving mission...");
    const model = { ...payload, volunteerId: user.uid };
    const missionId = uuidv4();

    firestore
      .collection("missions")
      .doc(missionId)
      .set({ ...model, status: "todo" });

    User.assignAsOwner(firestore, missionId, user.uid);
    console.log("Saved.");
  }

  async function onSubmit(payload) {
    const { title, description /**notes, privateNotes */ } = values;
    let val = { details: { title, description }, ...payload };
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
          val.details.url = url; // Todo: Refactor later
        }
      );
    }
    saveMissions(val);
    setLoading(false);
  }

  if (loading) return <CircularProgress />;

  return (
    <MissionForm
      history={history}
      values={values}
      onSubmit={onSubmit}
      getFile={(file) => setFile(file)}
      handleChange={handleChange}
      /*autoAssign={() => setAutoAssignHelper(!autoAssignHelper)}
      autoAssigned={autoAssignHelper}*/
    />
  );
}

export default withRouter(withFirestore(MakeMission));
