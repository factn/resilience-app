import { Grid } from "@material-ui/core";
import React from "react";

import { Button } from "../../component";
import { H5 } from "../component";

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
        <H5>Status</H5>
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
