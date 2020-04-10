import React from "react";
import { Typography, Grid } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { missionStatusLabel } from "../../constants";

const MissionCard = ({ mission }) => {
  return (
    <Grid container spacing={1}>
      <Grid container item>
        <Grid item>
          <Typography variant="h3">{mission.description}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <LocationOnIcon color="secondary" />
        <Typography variant="body2">123 Example St., San Francisco, 92501</Typography>
      </Grid>
      <Grid container item>
        <Typography variant="h4">status: {missionStatusLabel[mission.status]}</Typography>
      </Grid>
    </Grid>
  );
};
export default MissionCard;
