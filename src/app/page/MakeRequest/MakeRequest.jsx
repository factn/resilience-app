import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withRouter } from "react-router-dom";
import "firebase/storage";
import RequestForm from "./RequestForm";
import useForm from "../../hooks/useForm";
import { getFirebase, useFirestore, withFirestore } from "react-redux-firebase";

function MakeRequest({ history, firestore }) {
  const firebase = getFirebase();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const storage = firebase.storage();
  const { handleChange, values, setValues } = useForm();

  function getFile(file) {
    setFile(file);
  }

  function saveMissions() {
    firestore.add("missions", { ...values, status: "todo" });
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

export default withRouter(withFirestore(MakeRequest));
