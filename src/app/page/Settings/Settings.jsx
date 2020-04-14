import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

/**
 * Component for signing up users
 *
 * @component
 */
const Settings = (props) => {
  const [paypalId, setPaypalId] = useState("");

  const handleChange = (event) => {
    setPaypalId(event.target.value);
  };

  return (
    <>
      <Typography variant="h2">Organization Settings</Typography>
      <Typography variant="h6">PayPal Id</Typography>
      <Box display="flex" justifyContent="center">
        <TextField
          id="paypal-id"
          multiline
          rows={1}
          value={paypalId}
          onChange={handleChange}
          placeholder="enter your Paypal id"
          variant="outlined"
          fullWidth
        />
      </Box>
    </>
  );
};

export default Settings;
