import React, { useEffect } from "react";
import { useFirebase } from "react-redux-firebase";

import { User } from "../../model";

const defaultFirebaseUiConfig = (firebase) => ({
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult) {
      const { user } = authResult;

      User.update(user.uid, user);
    },
  },
});

const UI_ID = "firebase-auth-ui";
let ui;
export default function FirebaseAuthUi(props) {
  const firebase = useFirebase();
  const firebaseUiConfig = props.firebaseUiConfig || defaultFirebaseUiConfig(firebase);

  useEffect(() => {
    if (!ui) {
      ui = new window.firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start(`#${UI_ID}`, firebaseUiConfig);
  }, [firebase, firebaseUiConfig]);

  return <div id={UI_ID}></div>;
}
