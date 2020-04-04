import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, TextField, Input } from "@material-ui/core";
import { Button } from "../../component";
import EditIcon from "@material-ui/icons/Edit";
import { Card } from "../../layout";

function LinkPhoneAccount({ auth, data, errorHandler }) {
  const [phoneNumber, updatePhoneNumber] = useState("");

  async function onPhoneClick() {
    auth.useDeviceLanguage();
    const verifier = new auth.RecaptchaVerifier("phone-number-link", { size: "invisible" });
    try {
      const confirmationResult = await auth.currentUser.linkWithPhoneNumber(phoneNumber, verifier);
      const verificationCode = window.prompt(
        "Please enter the verification code that was sent to your mobile device."
      );
      await confirmationResult.confirm(verificationCode);
    } catch (error) {
      errorHandler(error);
    }
  }

  return data ? (
    <>
      <Input
        label="your phone number..."
        inputProps={{ "aria-label": "phoneNumber" }}
        defaultValue={data.phoneNumber}
        disabled
      />

      <Button
        id="phone-number-link"
        onClick={onPhoneClick}
        color="default"
        variant="default"
        aria-label="change phone number"
      >
        <EditIcon />
      </Button>
    </>
  ) : (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <TextField
          id="phone-number"
          label="Phone Number"
          type="text"
          helperText="Format: +1 540-319-7017, verificationCode: 123456"
          variant="outlined"
          required
          onChange={(e) => updatePhoneNumber(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button id="phone-number-link" onClick={onPhoneClick} color="secondary" variant="contained">
          Sign in with phone
        </Button>
      </Grid>
    </Grid>
  );
}

export default LinkPhoneAccount;
