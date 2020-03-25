import React from "react";
import RequestForm from "./RequestForm";
import useForm from "../../hooks/useForm";

function MakeRequest() {
  const { handleChange, values, setValues } = useForm();

  function getFile(file) {
    setValues({ ...values, file });
  }

  function onSubmit(e) {
    e.preventDefault();
    // make the call to firebase :) using the values
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
