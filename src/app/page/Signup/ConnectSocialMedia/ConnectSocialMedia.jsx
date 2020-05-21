import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import FirebaseAuthUi from "../../../component/FirebaseAuthUi/FirebaseAuthUi";
import { Page } from "../../../layout";
import { StyledHeader, useStyles } from "./ConnectSocialMedia.style";
import { useFirebase } from "react-redux-firebase";

/**
 * Connect Social Media page for use with Signup
 *
 */
const ConnectSocialMedia = ({ onConnectSuccess, onSkip }) => {
  const classes = useStyles();
  const firebase = useFirebase();

  const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callBacks: {
      signInSuccessWithAuthResult: function (authResult) {
        var user = authResult.user;
        /** 
         * TODO we are suppose to do with new user, do not rember what it was
        var credential = authResult.credential;
        var isNewUser = authResult.additionalUserInfo.isNewUser;
        var providerId = authResult.additionalUserInfo.providerId;
        var operationType = authResult.operationType;
        */
        return onConnectSuccess(user);
      },
    },
  };

  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Sign in
        </StyledHeader>
        <Body1 className={classes.body1}>
          Sign in more quickly next time by connecting your social media account!
        </Body1>
        <FirebaseAuthUi firebaseUiConfig={firebaseUiConfig} />
        <Button variant="link" className={classes.skipButton} onClick={onSkip}>
          Skip
        </Button>
      </Container>
    </Page>
  );
};

ConnectSocialMedia.propTypes = {
  handleButtonClick: PropTypes.func.isRequired,
  signInSuccess: PropTypes.func.isRequired,
};

export default ConnectSocialMedia;
