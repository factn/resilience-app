import PropTypes from "prop-types";
import React from "react";

import FirebaseAuthUi from "../../../component/FirebaseAuthUi/FirebaseAuthUi";
import { Page } from "../../../layout";
import { useFirebase } from "react-redux-firebase";

/**
 * Phone auth page for use with Signup
 *
 */
const PhoneAuth = ({ onSignupSuccess }) => {
  const firebase = useFirebase();
  const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        var user = authResult.user;
        /** 
         * TODO we are suppose to do with new user, do not rember what it was
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
        */
        return onSignupSuccess(user);
      },
    },
  };

  return (
    <Page>
      <FirebaseAuthUi firebaseUiConfig={firebaseUiConfig} />
    </Page>
  );
};

PhoneAuth.propTypes = {
  signInSuccess: PropTypes.func.isRequired,
};

export default PhoneAuth;
