import { Button, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { withLoading } from "../../HOC";
import MissionCard from "./MissionCard";

/**
 * Component consolidates the listing of missions on `/missions` routes and `/missions/volunteered` routes
 * @param {array} missions - Mission objects to display
 *
 */
const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const StyledButtonWithLargeBorder = styled(StyledButton)`
  border: 2px solid;

  &:hover {
    border: 2px solid;
  }
`;

const MissionListContainer = styled.div`
  width: 100%;
`;

/**
 * Create a missionList wrapper that will display a loading indicator
 */
const MissionListWithLoading = withLoading(({ children }) => (
  <MissionListContainer role="list">{children}</MissionListContainer>
));

/**
 * This component outputs a list of given missions.
 * Will output a loading
 * @param {array} props.missions - Missions to list
 * @param {object} props.history - Object given from React Router
 * @param {function} props.handlerUserVolunteering - Function that, when given a user ID, handles assigning the user with that ID to "volunteer" for that mission
 */
const MissionList = ({ callToAction, history, missions, ...rest }) => {
  /**
   * This should probably be turned into a Mission component
   */
  let { icon, onClick, text } = callToAction || {};

  const handleUpdatedMissionFns = missions.map((mission) => (
    () => { onClick(mission.uid); } 
  ));  
  const missionListItems = missions.map((mission, index) => (
    <MissionCard handleUpdatedMissions={handleUpdatedMissionFns[index]} mission={mission} key={`mission-card-${mission.uid}`} role="listitem">
      {text && (
        <StyledButton
          color="primary"
          variant="contained"
          startIcon={icon}
          disableElevation
          onClick={onClick}
        >
          {text}
        </StyledButton>
      )}
      <StyledButtonWithLargeBorder
        variant="outlined"
        color="primary"
        onClick={() => history.push(`/missions/${mission.uid}`)}
      >
        View Details
      </StyledButtonWithLargeBorder>
    </MissionCard>
  ));

  return (
    <MissionListWithLoading LoadingComponent={CircularProgress} {...rest}>
      {missionListItems}
    </MissionListWithLoading>
  );
};

MissionList.defaultProps = {
  missions: [],
  handlerUserVolunteering: () => null,
};

MissionList.propTypes = {
  missions: PropTypes.array,
  history: PropTypes.object,
  handleUserVolunteering: PropTypes.func,
};

export default MissionList;
