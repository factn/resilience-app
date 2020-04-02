import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { Page } from "../../layout";
import SMSLogin from "../../component/SMSLogin";
import { loginWithSMS, loginWithFacebook, loginWithGoogle, firstTimeSignIn } from "./firebaseLogin";

const LoginPage = (props) => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const [phoneNumber, updatePhoneNumber] = useState("");

  const DisplayLoginWarning = () => {
    if (props.location.state !== undefined)
      return props.location.state.warning === true ? (
        <Typography variant="h6">
          You are not logged in. Please sign in to view this page.
        </Typography>
      ) : null;
  };

  function handlePhoneNumberChange(e) {
    updatePhoneNumber(e.target.value);
  }

  function handleFacebookSignIn() {
    loginWithFacebook(firebase);
  }

  function handleGoogleSignIn() {
    loginWithGoogle(firebase);
  }
  function handleSMSLogin() {
    phoneNumber && loginWithSMS(firebase, phoneNumber);
  }

  if (!isLoaded(auth)) {
    return <CircularProgress />;
  } else if (isEmpty(auth)) {
    return (
      <Page>
        {DisplayLoginWarning()}
        <SMSLogin
          handlePhoneNumberChange={handlePhoneNumberChange}
          handleSMSLogin={handleSMSLogin}
          loginWithFacebook={handleFacebookSignIn}
          loginWithGoogle={handleGoogleSignIn}
        />
      </Page>
    );
  } else {
    if (firstTimeSignIn(auth)) {
      alert("First time sign in!");
    }
    return <Redirect to="/" />;
  }
};

export default LoginPage;
