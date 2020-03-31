import React from "react";
import { Typography, Grid } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const MissionCard = ({ mission }) => {
  let status = "";
  switch (mission.status) {
    case "todo":
      status = "need volunteers";
      break;
    case "doing":
      status = "in progress";
      break;
    case "done":
      status = "done";
      break;
    case "finished":
    default:
      status = "finished";
  }
  return (
    <Grid container spacing={1}>
      <Grid container item>
        <Grid item>
          <Typography variant="h5">{mission.description}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <LocationOnIcon color="secondary" />
        <Typography paragraph>123 Example St., San Francisco, 92501</Typography>
      </Grid>
    </Grid>
  );
};
export default MissionCard;
