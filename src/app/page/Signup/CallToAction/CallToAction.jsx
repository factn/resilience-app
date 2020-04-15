import React from "react";
import PropTypes from "prop-types";
import Button from "../../../component/Button";
import { useStyles, StyledHeader } from "./CallToAction.style";
import { Page } from "../../../layout";
import { Container } from "@material-ui/core";
import { Body1 } from "../../../component";

/**
 * Volunteer Call to Action page for use with Signup
 *
 */
function CallToAction({ onSubmit }) {
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
          onClick={onSubmit}
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
  onSubmit: PropTypes.func,
};

export default CallToAction;
