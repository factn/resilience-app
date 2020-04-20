import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, CircularProgress } from "@material-ui/core";
import { MissionCard } from "./index";
import { withLoading } from "../HOC";

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
  margin-top: 15px;
`;

/**
 * Create a missionList wrapper that will display a loading indicator
 */
const MissionListWithLoading = withLoading(({ children }) => (
  <MissionListContainer className="mission-list" role="list">
    {children}
  </MissionListContainer>
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
  let { onClick, text } = callToAction || {};

  const missionListItems = missions.map((mission) => (
    <MissionCard mission={mission} key={`mission-card-${mission.id}`} role="listitem">
      {text && (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={() => onClick(mission.id)}
        >
          {text}
        </StyledButton>
      )}
      <StyledButtonWithLargeBorder
        variant="outlined"
        color="primary"
        onClick={() => history.push(`/missions/${mission.id}`)}
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
