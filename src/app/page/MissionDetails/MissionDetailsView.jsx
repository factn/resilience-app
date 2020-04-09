import React from "react";

import { Button } from "../../component";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import { Card } from "../../layout";

import profileImg from "../../../img/fb-profile.jpg";
import { ReactComponent as MapMarkerImg } from "../../../img/map-marker-alt.svg";
// Created based on the schema in firebase
import styled from "styled-components";

import MapView from "../../component/MapView";
import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

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
  requester,
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
          <Typography variant="h4">status: {mission.status}</Typography>
        </Box>
        <Grid>
          <Button text="Volunteer" onClick={volunteerForMission} />
        </Grid>
        <StyledHr />

        <Box my={2}>
          <Grid container wrap="nowrap" spacing={3} direction="row" alignItems="center">
            <Grid item>
              <Avatar alt={`${requester.name} Avatar Image`} src={profileImg} />
            </Grid>
            <Grid item>
              <Typography variant="h4">{requester.name}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box my={1}>
          <MapMarkerImg />
          <Typography variant="h6">{requester.address}</Typography>
        </Box>
        <Typography variant="body1">{mission.details}</Typography>
        <MapViewContainer>
          {cords != undefined ? (
            <MapView values={cords} />
          ) : (
            <Typography variant="p">map: no valid location.</Typography>
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
