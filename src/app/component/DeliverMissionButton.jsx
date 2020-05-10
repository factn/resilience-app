import { Grid } from "@material-ui/core";
import { Button } from "./";
import React from "react";

/**
 * Button that facliitates confirmation of mission delivery.
 *
 * @component
 */
const DeliverMissionButton = ({ buttonClass, deliverMission }) => {
  return (
    <Button size="medium" onClick={deliverMission} className={buttonClass}>
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems={"center"}
        justify={"center"}
        style={{ width: "100%" }}
      >
        <Grid item>CONFIRM DELIVERY</Grid>
      </Grid>
    </Button>
  );
};

export default DeliverMissionButton;
