import React, { useEffect } from "react";
import { useFirebase } from "react-redux-firebase";

const defaultFirebaseUiConfig = (firebase) => ({
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
});

const UI_ID = "firebase-auth-ui";
export default function FirebaseAuthUi(props) {
  const firebase = useFirebase();
  const firebaseUiConfig = props.firebaseUiConfig || defaultFirebaseUiConfig(firebase);

  useEffect(() => {
    const ui = new window.firebaseui.auth.AuthUI(firebase.auth());
    ui.start(`#${UI_ID}`, firebaseUiConfig);
  }, [firebase, firebaseUiConfig]);

  return <div id={UI_ID}></div>;
}
