import React from "react";
import { Button } from "../../component";
import { Grid, Typography } from "@material-ui/core";

const UserStatus = ({ setStatus, status }) => {
  const isAvailable = status === "Available";
  function setUserAvailable(e) {
    e.preventDefault();
    setStatus("Available");
  }
  function setUserUnavailable(e) {
    e.preventDefault();
    setStatus("Unavailable");
  }

  return (
    <>
      <Grid item>
        <Typography variant="h5">Status</Typography>
      </Grid>

      <Grid item>
        <Button onClick={setUserAvailable} color={isAvailable ? "primary" : "default"}>
          Available
        </Button>
        <Button onClick={setUserUnavailable} color={isAvailable ? "default" : "primary"}>
          Unavailable
        </Button>
      </Grid>
    </>
  );
};
export default UserStatus;
