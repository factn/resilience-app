import React from "react";
import PropTypes from 'prop-types';
import { Typography, Grid } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { missionStatusLabel } from "../../constants";

/**
 * Component for displaying mission information on a card
 *
 * @param {boolean} missionControl - Flag indicating this card
 * is used by MissionControl which changes font sizes and hides status
 */
const MissionCard = ({ mission, missionControl }) => {

  const bodyProps = {}
  let headerVariant

  if (missionControl) {
    bodyProps.paragraph = true
    headerVariant = 'h5'
  } else {
    bodyProps.variant = 'body2'
    headerVariant = 'h3'
  }
  return (
    <Grid container spacing={1}>
      <Grid container item>
        <Grid item>
          <Typography variant={headerVariant}>{mission.description}</Typography>
        </Grid>
      </Grid>
      <Grid container item>
        <LocationOnIcon color="secondary" />
        <Typography {...bodyProps} >123 Example St., San Francisco, 92501</Typography>
      </Grid>
      {!missionControl && (
        <Grid container item>
          <Typography variant="h4">status: {missionStatusLabel[mission.status]}</Typography>
        </Grid>
      )}
    </Grid>
  );
};

MissionCard.propTyes = {
  missionControl: PropTypes.bool,
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    status: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    details: PropTypes.any,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};

export default MissionCard;
