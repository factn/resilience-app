import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, TextField, Input } from "@material-ui/core";
import { Button, H5 } from "../../component";
import EditIcon from "@material-ui/icons/Edit";
import { Card } from "../../layout";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "36px",
    width: "100px",
  },
}));

function LinkPhoneAccount({ firebase, auth, data, errorHandler, captchaVerifier }) {
  const [phoneNumber, updatePhoneNumber] = useState("");
  const classes = useStyles();

  async function onPhoneClick() {
    try {
      const verifier = new firebase.auth.RecaptchaVerifier("phone-number-link", {
        size: "invisible",
      });

      auth.useDeviceLanguage();
      const confirmationResult = await auth.currentUser.linkWithPhoneNumber(phoneNumber, verifier);
      const verificationCode = window.prompt(
        "Please enter the verification code that was sent to your mobile device."
      );
      await confirmationResult.confirm(verificationCode);
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <Card>
      <Grid container item spacing={1}>
        <Grid item container>
          <H5>Phone Number</H5>
        </Grid>

        <Grid container>
          <Grid item xs={6}>
            <Grid item container>
              <TextField
                id="phone-number"
                value={data.phoneNumber}
                disabled
                onChange={(e) => updatePhoneNumber(e.target.value)}
              />
            </Grid>
          </Grid>

          <Button
            id="phone-number-link"
            onClick={onPhoneClick}
            color="secondary"
            variant="contained"
            className={classes.button}
          >
            {data ? "Change" : "Connect"}
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default LinkPhoneAccount;
