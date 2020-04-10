import React from "react";

import { Button } from "../../component";
import { Typography, Grid, Box } from "@material-ui/core";
import { Card } from "../../layout";

// Created based on the schema in firebase
import styled from "styled-components";

import MapView from "../../component/MapView";
import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";
import { missionStatusLabel } from '../../../constants';

export const StyledHr = styled.hr`
  border: 1px dashed #de3254;
  width: 100%;
  margin: 10px auto;
`;

export const StyledImage = styled.img`
  height: auto;
  max-width: 100%;
`;

const MapViewContainer = styled.div`
  display: flex;
  margin: 1% auto;
  padding: 1% 1%;
`;

export const StyledDiv = styled.div`
  height: auto;
  margin: 10px 0;
  max-width: 100%;
`;

const MissionDetailsPage = ({
  mission,
  volunteerForMission,
  userUnverifiedPopupOpen,
  setUserUnverifiedPopupOpen,
  cords,
  history,
}) => {
  return (
    <>
      <Card>
        <Button
          text="Back to Missions"
          onClick={() => {
            history.push("/missions");
          }}
        />
      </Card>

      <Card>{mission.url && <StyledImage src={mission.url} />}</Card>
      <Card>
        <Typography variant="h2">{mission.description}</Typography>
        <Box my={2}>
          <Typography variant="h4">status: {missionStatusLabel[mission.status]}</Typography>
        </Box>
        <Grid>
          <Button text="Volunteer" onClick={volunteerForMission} />
        </Grid>
        <StyledHr />

        <Typography variant="body1">{mission.details}</Typography>
        <MapViewContainer>
          {cords !== undefined ? (
            <MapView values={cords} />
          ) : (
            <Typography>map: no valid location.</Typography>
          )}
        </MapViewContainer>
      </Card>
      <UserPhoneUnverifiedPopup
        open={userUnverifiedPopupOpen}
        handleClose={() => setUserUnverifiedPopupOpen(false)}
      />
    </>
  );
};
export default MissionDetailsPage;
