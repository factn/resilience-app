import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { Page } from "../../layout";
import SMSLogin from "../../component/SMSLogin";
import Popup from "../../component/Popup";
import { loginWithSMS, loginWithFacebook, loginWithGoogle, firstTimeSignIn } from "./firebaseLogin";

const LoginPage = (props) => {
  const firebase = useFirebase();
  const history = useHistory();
  const auth = useSelector((state) => state.firebase.auth);
  const [phoneNumber, updatePhoneNumber] = useState("");
  const [popupOpen, setPopupOpen] = useState(true);

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

  function handlePopupClose() {
    setPopupOpen(false);
    history.push("/");
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
      return (
        <Page>
          <Popup open={popupOpen} handleClose={handlePopupClose} btnText="Home Page">
            <Typography>Your account has been created. Welcome!</Typography>
          </Popup>
        </Page>
      );
    }
    return <Redirect to="/" />;
  }
};

export default LoginPage;
