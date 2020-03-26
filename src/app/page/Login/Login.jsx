import React, {useState} from "react";
import { useSelector } from "react-redux";

import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";
import { Page } from "../../layout";
import SMSLogin from "../../component/SMSLogin";

const LoginPage = () => {
  const firebase = useFirebase();
  // @ts-ignore
  const auth = useSelector((state) => state.firebase.auth);
  const [phoneNumber, updatePhoneNumber] = useState("");
  function loginWithFacebook() {
    return firebase.login({ provider: "facebook", type: "popup" });
  }

  function loginWithSMS(phoneNumber) {
    firebase.auth().useDeviceLanguage();
    //@ts-ignore
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container");

    //@ts-ignore
    window.recaptchaVerifier.render().then(function (widgetId) {
      //@ts-ignore
      window.recaptchaWidgetId = widgetId;
    });
    // @ts-ignore
    firebase
      .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("Login success", confirmationResult);
        window.recaptchaVerifier.clear();
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const verificationCode = window.prompt(
          "Please enter the verification " + "code that was sent to your mobile device."
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
    <>
      {
        <Page>
          <SMSLogin
            handlePhoneNumberChange={handlePhoneNumberChange}
            handleSMSLogin={handleSMSLogin}
            loginWithFacebook={loginWithFacebook}
          />
        </Page>
      }
    </>
  ) : (
    <>
      <h3>signed in</h3>
      <p>User: {JSON.stringify(auth)}</p>
      <button onClick={firebase.logout}>
        <h5>Sign out</h5>
      </button>
    </>
  );
};

export default LoginPage;
