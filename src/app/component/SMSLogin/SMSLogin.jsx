import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Typography, TextField } from "@material-ui/core";

function SMSLogin({ loginWithFacebook, handlePhoneNumberChange, handleSMSLogin }) {
  return (
    <>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <Typography component="h2" variant="h6">
            Please sign in below
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center" direction="column">
        <Grid item>
          <Button onClick={loginWithFacebook} color="primary" variant="contained">
            Sign in with FB
          </Button>
        </Grid>
        <Grid item>
          <Typography component="p" variant="h5">
            OR
          </Typography>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                id="phone-number"
                label="Phone number"
                type="text"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handlePhoneNumberChange}
              />
            </Grid>
            <Grid item>
              <Button
                id="sms-sign-in"
                onClick={handleSMSLogin}
                color="secondary"
                variant="contained"
              >
                Sign in with phone
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid id="recaptcha-container" container spacing={3} justify="center"></Grid>
    </>
  );
}

export default SMSLogin;

SMSLogin.propTypes = {
  loginWithFacebook: PropTypes.func.isRequired,
  handlePhoneNumberChange: PropTypes.func.isRequired,
  handleSMSLogin: PropTypes.func.isRequired
};
