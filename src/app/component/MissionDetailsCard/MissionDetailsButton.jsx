import React from "react";
import PropTypes from "prop-types";

import { Button, Grid } from "@material-ui/core";
import { MissionStatus } from "../../model";
import { color } from "../../../theme";
import styled from "styled-components";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

/**
 * Component for displaying a button based of the mission status
 *
 * @component
 */
const MissionDetailsButton = ({
  status,
  volunteerForMission,
  startMission,
  markMissionAsDelivered,
}) => {
  switch (status) {
    case MissionStatus.unassigned:
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
    case MissionStatus.tentative:
    case MissionStatus.assigned:
      return (
        <StyledButton color="primary" variant="contained" disableElevation onClick={startMission}>
          Start Mission
        </StyledButton>
      );
    case MissionStatus.started:
      return (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={markMissionAsDelivered}
        >
          Mark Mission as Delivered
        </StyledButton>
      );
    case MissionStatus.delivered:
    case MissionStatus.done:
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
  status === MissionStatus.tentative ||
  (status === MissionStatus.assigned && (
    <Grid container justify="center">
      <StyledButton
        style={{ color: color.darkPink, textDecoration: "underline" }}
        disableElevation
        onClick={unassignFromMission}
      >
        Unassign Me
      </StyledButton>
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
