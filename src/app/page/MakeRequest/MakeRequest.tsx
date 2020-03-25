import React from "react";
import RequestForm from "./RequestForm";
import useForm from "../../hooks/useForm";

import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import * as FirebaseApi from 'firebase/app';
import { getFirebase, useFirebase, isLoaded, isEmpty } from "react-redux-firebase";

type Request = {
  id: string;
  description: string;
  details: string;
};

function MakeRequest() {

const firebase = getFirebase()

  const { handleChange, values, setValues } = useForm();

  function getFile(file: File) {
    setValues({ ...values, file });
  }

  function onSubmit(e: Event) {
    e.preventDefault();
    const db = firebase.firestore()
    db.collection("requests").add(values)
  }

  return (
    <RequestForm
      values={values}
      onSubmit={onSubmit}
      getFile={getFile}
      handleChange={handleChange}
    />
  );
}

export default MakeRequest;
