import { Button, Container } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import { Page } from "../../../layout";
import { StyledHeader, useStyles } from "./SignupSuccess.style";

/**
 * Success page for Signup
 *
 */
function SignupSuccess({ handleButtonClick }) {
  const classes = useStyles();

  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Thanks!
        </StyledHeader>
        <Body1 className={classes.body1}>
          You will be notified when the organizer approves your volunteer registration.
        </Body1>
        <StyledHeader main align="center" variant="h3">
          {`<image placeholder>`}
        </StyledHeader>
        <Button
          className={classes.button}
          id="redirect-to-dashboard"
          onClick={handleButtonClick}
          color="primary"
          variant="outlined"
        >
          Go to Volunteer Dashboard
        </Button>
      </Container>
    </Page>
  );
}

SignupSuccess.propTypes = {
  handleButtonClick: PropTypes.func,
};

export default SignupSuccess;
