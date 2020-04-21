import firebase from "firebase";
import PropTypes from "prop-types";
import React from "react";

import FirebaseAuthUi from "../../../component/FirebaseAuthUi/FirebaseAuthUi";
import { Page } from "../../../layout";

/**
 * Phone auth page for use with Signup
 *
 */
const PhoneAuth = ({ signInSuccess }) => {
  const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.PhoneAuthProvider.PROVIDER_ID],
    callBacks: {
      signInSuccess,
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
