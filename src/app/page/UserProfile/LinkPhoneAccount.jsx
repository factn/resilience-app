import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import { Button, H5 } from "../../component";
import { Card } from "../../layout";
import SuccessSnackbar from "../../component/Snackbars/SuccessSnackbar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "36px",
    width: "100px",
  },
}));

function LinkPhoneAccount({ firebase, auth, data, errorHandler }) {
  const currentUserPhoneNumber = data?.phoneNumber || "";
  const [phoneNumber, updatePhoneNumber] = useState(currentUserPhoneNumber);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [userHasPhone, setUserHasPhone] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (currentUserPhoneNumber && currentUserPhoneNumber.length > 0) {
      setUserHasPhone(true);
    }
  }, []);

  async function onPhoneClick() {
    const successCallback = (verifier) => {
      verifier.clear();
      setSuccessSnackbarOpen(true);
      window.location.reload(false);
    };
    const verificationPrompt =
      "Please enter the verification code that was sent to your mobile device.";
    try {
      const verifier = new firebase.auth.RecaptchaVerifier("phone-number-link", {
        size: "invisible",
      });

      auth.useDeviceLanguage();
      if (!userHasPhone) {
        const confirmationResult = await auth.currentUser.linkWithPhoneNumber(
          phoneNumber,
          verifier
        );
        const verificationCode = window.prompt(verificationPrompt);
        await confirmationResult.confirm(verificationCode);
        successCallback(verifier);
      } else {
        const provider = new firebase.auth.PhoneAuthProvider();
        const verificationId = await provider.verifyPhoneNumber(phoneNumber, verifier);
        const verificationCode = window.prompt(verificationPrompt);
        const phoneCredential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        );
        await auth.currentUser.updatePhoneNumber(phoneCredential);
        successCallback(verifier);
      }
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
                value={phoneNumber}
                helperText="+1 7777777777"
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
      <SuccessSnackbar
        open={successSnackbarOpen}
        handleClose={() => setSuccessSnackbarOpen(false)}
        successMessage="Phone linked successfully"
      />
    </Card>
  );
}

export default LinkPhoneAccount;
