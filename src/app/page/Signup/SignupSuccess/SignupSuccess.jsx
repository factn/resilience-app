import React from "react";
import PropTypes from "prop-types";
import { useStyles, StyledHeader } from "./SignupSuccess.style";
import { Page } from "../../../layout";
import { Container, Button } from "@material-ui/core";
import { Body1 } from "../../../component"
import SuccessSnackbar from "../../../component/Snackbars/SuccessSnackbar"


  /**
   * Success page for Signup
   *
   */
  function SignupSuccess({ onSubmit }) {
  const classes = useStyles()

  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <SuccessSnackbar
          open
          successMessage="Your account request has been successfully submitted and is pending approval"
        />
        <StyledHeader main align="center" variant="h1">
          Thanks!
        </StyledHeader>
          <Body1 className={classes.body1}>
            You will be notified when the organizer approves your volunteer registration.
          </Body1>
          <StyledHeader main align="center" variant="h3">
          {`<image placeholder>`}
        </StyledHeader>
          <Button className={classes.button} id="redirect-to-dashboard" onClick={onSubmit} color="primary" variant="outlined">
            Go to Volunteer Dashboard
          </Button>
        </Container>
    </Page>
  )
}

SignupSuccess.propTypes = {
  onSubmit: PropTypes.func,
};

export default SignupSuccess
