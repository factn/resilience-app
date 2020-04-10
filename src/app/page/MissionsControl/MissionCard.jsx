import React from "react";
import { Typography, Grid } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

/**
 * Component for displaying mission information on a card
 * on MissionControl page
 *
 * @component
 */
const MissionCard = ({ mission }) => {
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
