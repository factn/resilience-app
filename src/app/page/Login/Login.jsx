import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { Page } from "../../layout";
import SMSLogin from "../../component/SMSLogin";

const LoginPage = (props) => {
  const firebase = useFirebase();
  const auth = useSelector((state) => state.firebase.auth);
  const [phoneNumber, updatePhoneNumber] = useState("");

  const DisplayLoginWarning = () => {
    if (props.location.state !== undefined)
      return props.location.state.warning === true ? (
        <h6>You are not logged in. Please sign in to view this page.</h6>
      ) : null;
  };

  function loginWithFacebook() {
    return firebase.login({ provider: "facebook", type: "popup" });
  }
  function loginWithGoogle() {
    return firebase.login({ provider: "google", type: "popup" });
  }

  function loginWithSMS(phoneNumber) {
    firebase.auth().useDeviceLanguage();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

    window.recaptchaVerifier.render().then(function (widgetId) {
      window.recaptchaWidgetId = widgetId;
    });
    firebase
      .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("Login success", confirmationResult);
        window.recaptchaVerifier.clear();
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const verificationCode = window.prompt(
          "Please enter the verification code that was sent to your mobile device."
        );
        return confirmationResult.confirm(verificationCode);
      })
      .catch((error) => {
        console.error(error);
        // Error; SMS not sent
        // Handle Errors Here
        window.recaptchaVerifier.clear();
        return Promise.reject(error);
      });
  }

  function handlePhoneNumberChange(e) {
    updatePhoneNumber(e.target.value);
  }
  function handleSMSLogin() {
    phoneNumber && loginWithSMS(phoneNumber);
  }

  return !isLoaded(auth) ? (
    <span>Loading...</span>
  ) : isEmpty(auth) ? (
    <Fragment>
      {
        <Page>
          {DisplayLoginWarning()}
          <SMSLogin
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleSMSLogin={handleSMSLogin}
            loginWithFacebook={loginWithFacebook}
            loginWithGoogle={loginWithGoogle}
          />
        </Page>
      }
    </Fragment>
  ) : (
    <Redirect to="/" />
  );
};

export default LoginPage;
