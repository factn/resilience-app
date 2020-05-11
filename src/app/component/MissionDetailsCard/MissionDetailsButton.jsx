import { Button, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { color } from "../../../theme";
import { Mission } from "../../model";
import UnassignMeButton from "../UnassignMeButton";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

/**
 * Component for displaying a button based of the mission status
 *
 * @component
 */
const MissionDetailsButton = ({
  openMissionDeliveredCard,
  startMission,
  status,
  volunteerForMission,
}) => {
  switch (status) {
    case Mission.Status.unassigned:
      return (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={volunteerForMission}
        >
          Accept Mission
        </StyledButton>
      );
    case Mission.Status.tentative:
    case Mission.Status.assigned:
      return (
        <StyledButton color="primary" variant="contained" disableElevation onClick={startMission}>
          Start Mission
        </StyledButton>
      );
    case Mission.Status.started:
      return (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={openMissionDeliveredCard}
        >
          Mark Mission as Delivered
        </StyledButton>
      );
    case Mission.Status.delivered:
    case Mission.Status.done:
      return null;
    default:
      return (
        <StyledButton color="primary" variant="contained" disableElevation>
          Loading..
        </StyledButton>
      );
  }
};

/**
 * Component for displaying an "Unassign Me" button
 *
 * @component
 */
const MissionDetailsUnassignMeButton = ({ status, unassignFromMission }) =>
  status === Mission.Status.tentative ||
  (status === Mission.Status.assigned && (
    <Grid container justify="center">
      <UnassignMeButton unassignMission={unassignFromMission} />
    </Grid>
  ));

MissionDetailsButton.propTypes = {
  /**
   * mission status
   */
  status: PropTypes.string,
  /**
   * handler functions
   */
  volunteerForMission: PropTypes.func,
  startMission: PropTypes.func,
  markMissionAsDelivered: PropTypes.func,
};

MissionDetailsUnassignMeButton.propTypes = {
  /**
   * mission status
   */
  status: PropTypes.string,
  /**
   * handler functions
   */
  unassignFromMission: PropTypes.func,
};

export { MissionDetailsButton, MissionDetailsUnassignMeButton };
