import React from "react";
import { useSelector } from "react-redux";
import * as FirebaseApi from 'firebase/app';
import { useFirebase, isLoaded, isEmpty } from "react-redux-firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  // @ts-ignore
  const auth = useSelector(state => state.firebase.auth);

  function loginWithFacebook() {
    return firebase.login({ provider: "facebook", type: "popup" });
  }

  function loginWithSMS(phoneNumber: string){
    firebase.auth().useDeviceLanguage();
    //@ts-ignore
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    
    //@ts-ignore
    window.recaptchaVerifier.render().then(function(widgetId) {
      //@ts-ignore
      window.recaptchaWidgetId = widgetId;
    });
    // @ts-ignore
    firebase.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("Login success", confirmationResult)
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const verificationCode = window.prompt('Please enter the verification ' +
            'code that was sent to your mobile device.');
        return confirmationResult.confirm(verificationCode!);
      })
      .catch((error) => {
        console.error(error);
        // Error; SMS not sent
        // Handle Errors Here
        return Promise.reject(error)
      });
  }

  return (
    !isLoaded(auth) ? (
      <span>Loading...</span>
    ) : isEmpty(auth) ? (
      <>
        <h3>Please sign in below</h3>
        <button onClick={loginWithFacebook}>
          <h5>Sign in with FB</h5>
        </button>
        <button onClick={() => loginWithSMS("+17035073135")}>
          <h5>Sign in with phone</h5>
        </button>
        <div id="recaptcha-container"></div>
      </>
    ) : (
      <>
        <h3>signed in</h3>
        <p>User: {JSON.stringify(auth)}</p>
        <button onClick={firebase.logout}>
          <h5>Sign out</h5>
        </button>
      </>
    )
  );
};

export default LoginPage;
