import { Container } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import Button from "../../../component/Button";
import { Page } from "../../../layout";
import { StyledHeader, useStyles } from "./CallToAction.style";

/**
 * Volunteer Call to Action page for use with Signup
 *
 */
function CallToAction({ handleButtonClick }) {
  const classes = useStyles();

  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Volunteer with us
        </StyledHeader>
        <Body1 className={classes.body1}>
          Make a difference in your neighbourhood and help out those in need. We need people like
          you! (placeholder copy
        </Body1>
        <StyledHeader main align="center" variant="h3">
          Get Started
        </StyledHeader>
        <Button
          className={classes.button}
          id="sms-sign-in"
          onClick={handleButtonClick}
          color="secondary"
          variant="contained"
        >
          Sign up with phone
        </Button>
      </Container>
    </Page>
  );
}

CallToAction.propTypes = {
  handleButtonClick: PropTypes.func,
};

export default CallToAction;
