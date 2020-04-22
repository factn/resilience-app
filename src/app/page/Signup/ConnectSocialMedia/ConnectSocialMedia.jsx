import { Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import FirebaseAuthUi from "../../../component/FirebaseAuthUi/FirebaseAuthUi";
import { Page } from "../../../layout";
import { StyledHeader, useStyles } from "./ConnectSocialMedia.style";

/**
 * Connect Social Media page for use with Signup
 *
 */
const ConnectSocialMedia = ({ handleButtonClick, signInSuccess }) => {
  const classes = useStyles();

  const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callBacks: {
      signInSuccess,
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
        <Button variant="link" className={classes.skipButton} onClick={handleButtonClick}>
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
