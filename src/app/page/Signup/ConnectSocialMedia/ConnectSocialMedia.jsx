import firebase from "firebase";
import React from "react";
import PropTypes from "prop-types";
import { useStyles, StyledHeader } from "./ConnectSocialMedia.style";
import { Page } from "../../../layout";
import { Container } from "@material-ui/core";
import { Body1 } from "../../../component";
import { Button } from "@material-ui/core";
import FirebaseAuthUi from "../../../component/FirebaseAuthUi/FirebaseAuthUi";

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
