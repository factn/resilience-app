import React from "react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { Button } from "../../component";
import { Page, Card } from "../../layout";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";

import profileImg from "../../../img/fb-profile.jpg";
import { ReactComponent as MapMarkerImg } from "../../../img/map-marker-alt.svg";
// Created based on the schema in firebase
import styled from "styled-components";
import { isLoaded, withFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { User } from "../../model";
import { missionStatusDict } from "../../model/Mission";

export const StyledHr = styled.hr`
  border: 1px dashed #de3254;
  width: 100%;
  margin: 10px auto;
`;

export const StyledImage = styled.img`
  height: auto;
  max-width: 100%;
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

  function volunteerForMission() {
    User.assignAsVolunteer(firestore, missionId, user.uid);
  }

  let requester = {
    name: "Audrey",
    address: "123 Example st, San Fransisco, 92501",
  };

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
            {
              mission.volunteerId !== user.uid && (
              <Grid>
                <Button text="Volunteer" onClick={volunteerForMission} />
              </Grid>
            )}
            <StyledHr />
            <Box my={2}>
              <Grid container wrap="nowrap" spacing={3} direction="row" alignItems="center">
                <Grid item>
                  <Avatar src={profileImg} />
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
          </Card>
        </>
      )}
    </Page>
  );
};
export default withFirestore(MissionDetailsPage);
