import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
export default function PhoneLoginForm(props) {
  const { handlePhoneLogin, handlePhoneNumberChange } = props;
  return (
    <Grid container spacing={1} direction="column">
      <Grid item>
        <TextField
          id="phone-number"
          label="Phone Number"
          type="text"
          helperText="+1 777-777-7777 VerificationCode: 123456"
          variant="outlined"
          required
          onChange={handlePhoneNumberChange}
        />
      </Grid>
      <Grid item style={{ alignSelf: "center" }}>
        <Button id="sms-sign-in" onClick={handlePhoneLogin} color="secondary" variant="contained">
          Sign in with phone
        </Button>
      </Grid>
    </Grid>
  );
}
