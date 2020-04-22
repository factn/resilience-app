import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import { Button, H5 } from "../../component";
import SuccessSnackbar from "../../component/Snackbars/SuccessSnackbar";
import { Card } from "../../layout";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "36px",
    width: "100px",
  },
}));

function LinkPhoneAccount({ auth, data, errorHandler, firebase }) {
  const currentUserPhoneNumber = data?.phoneNumber || "";
  const [phoneNumber, setPhoneNumber] = useState(currentUserPhoneNumber);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const classes = useStyles();

  function clearRecapcha() {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
  }
  async function onPhoneClick() {
    const successCallback = () => {
      clearRecapcha();
      setSuccessSnackbarOpen(true);
      window.location.reload(false);
    };
    const verificationPrompt =
      "Please enter the verification code that was sent to your mobile device.";
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("phone-number-link", {
          size: "invisible",
        });
      }

      auth.useDeviceLanguage();
      if (!currentUserPhoneNumber) {
        const confirmationResult = await auth.currentUser.linkWithPhoneNumber(
          phoneNumber,
          window.recaptchaVerifier
        );
        const verificationCode = window.prompt(verificationPrompt);
        await confirmationResult.confirm(verificationCode);
        successCallback();
      } else {
        const provider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await provider.verifyPhoneNumber(
          phoneNumber,
          window.recaptchaVerifier
        );
        const verificationCode = window.prompt(verificationPrompt);
        const phoneCredential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        await auth.currentUser.updatePhoneNumber(phoneCredential);
        successCallback();
      }
    } catch (error) {
      if (error.code === "auth/argument-error" && error.message.includes("verificationCode")) {
        setPhoneNumber(currentUserPhoneNumber);
        return;
      }
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
                value={phoneNumber}
                helperText="+1 7777777777"
                onChange={(e) => setPhoneNumber(e.target.value)}
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
      <SuccessSnackbar
        open={successSnackbarOpen}
        handleClose={() => setSuccessSnackbarOpen(false)}
        successMessage="Phone linked successfully"
      />
    </Card>
  );
}

export default LinkPhoneAccount;
