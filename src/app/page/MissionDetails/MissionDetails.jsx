import React, { useState, useEffect } from "react";

import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";

import profileImg from "../../../img/fb-profile.jpg";
import { ReactComponent as MapMarkerImg } from "../../../img/map-marker-alt.svg";
// Created based on the schema in firebase
import styled from "styled-components";
import { isLoaded, withFirestore, isEmpty } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { User } from "../../model";

import MapView from "../../component/MapView";
import addressLookUp from "../../utils/addressLookUp";
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

const MissionDetailsPage = ({ firestore, match }) => {
  let history = useHistory();
  const missionId = match.params.id;
  // syncing the mission
  useFirestoreConnect({
    collection: "missions",
    doc: missionId,
  });
  // select the mission
  const mission = useSelector(
    ({ firestore: { data } }) => data.missions && data.missions[missionId]
  );
  const user = useSelector((state) => state.firebase.auth);

  const [userUnverifiedPopupOpen, setUserUnverifiedPopupOpen] = useState(false);

  function volunteerForMission(missionId) {
    if (!user.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      User.assignAsVolunteer(firestore, missionId, user.uid);
    }
  }

  let requester = {
    name: "Audrey",
    address: "123 Example st, San Fransisco, 92501",
  };

  // functionality for the map look up
  const [cords, setCords] = useState();
  if (isLoaded(mission) && !isEmpty(mission) && !cords) {
    const missionLocation =
      mission.address + "%20" + mission.city + "%20" + mission.state + "%20" + mission.postalCode;
    const dataForCords = addressLookUp(missionLocation);
    dataForCords.then((res) => setCords(res)).catch((error) => console.log(error));
  } else {
    console.log("No location data available");
  }

  return (
    <Page>
      {!isLoaded(mission) ? (
        <Card> Loading ... </Card>
      ) : (
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
                  <Avatar alt={`${requester.name} Avater Image`} src={profileImg} />
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
        </>
      )}
      <UserPhoneUnverifiedPopup
        open={userUnverifiedPopupOpen}
        handleClose={() => setUserUnverifiedPopupOpen(false)}
      />
    </Page>
  );
};
export default withFirestore(MissionDetailsPage);
