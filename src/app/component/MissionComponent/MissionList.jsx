import { CircularProgress } from "@material-ui/core";
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
const MissionList = ({ missions, ...rest }) => {
  return (
    <MissionListWithLoading LoadingComponent={CircularProgress} {...rest}>
      {missions.map((mission) => (
        <MissionCard mission={mission} key={`mission-card-${mission.uid}`} role="listitem" />
      ))}
    </MissionListWithLoading>
  );
};

MissionList.defaultProps = {
  missions: [],
};

MissionList.propTypes = {
  missions: PropTypes.array,
  history: PropTypes.object,
};

export default MissionList;
