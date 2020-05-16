import { Grid } from "@material-ui/core";
import { Button } from "./";
import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

/**
 * Button that facliitates starting a mission.
 *
 * @component
 */
const StartMissionButton = ({ buttonClass, startMission }) => {
  return (
    <Button size="medium" onClick={startMission} className={buttonClass}>
      <Grid
        container
        direction="row"
        spacing={1}
        alignItems={"center"}
        justify={"center"}
        style={{ width: "100%" }}
      >
        <Grid item>
          <PlayCircleFilledIcon />
        </Grid>
        <Grid item>START</Grid>
      </Grid>
    </Button>
  );
};

export default StartMissionButton;
