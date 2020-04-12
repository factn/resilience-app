import React from "react";
import styled from "styled-components";
import { Button, Card, CircularProgress, Grid } from "@material-ui/core";
import { MissionCard } from "./index";
import { withLoading } from "../HOC";

/**
 * Component consolidates the listing of missions on `/missions` routes and `/missions/volunteered` routes
 * @param {array} missions - Mission objects to display
 *
 */
const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

const PlaceHolder = styled.div`
  width: 16px;
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
const MissionList = ({ missions, history, handleUserVolunteering, ...rest }) => {
  /**
   * This should probably be turned into a Mission component
   */
  const missionListItems = missions
    ? missions.map((mission) => (
        <Card key={mission.id} role="listitem">
          <MissionCard mission={mission} key={`preview-${mission.id}`} />
          <Grid container justify="center" alignItems="center">
            {handleUserVolunteering && (
              <StyledButton
                color="primary"
                size="large"
                variant="contained"
                disableElevation
                onClick={() => handleUserVolunteering(mission.id)}
              >
                Volunteer
              </StyledButton>
            )}
            <PlaceHolder />
            <StyledButton
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => history.push(`/missions/${mission.id}`)}
            >
              Details
            </StyledButton>
          </Grid>
        </Card>
      ))
    : "";

  return (
    <MissionListWithLoading LoadingComponent={CircularProgress} {...rest}>
      {missionListItems}
    </MissionListWithLoading>
  );
};

export default MissionList;
