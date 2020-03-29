import React from "react";
import { useFirestoreConnect, withFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Typography, Button, Grid } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { User } from "../../model";
import { MissionCard } from "../../component";

const StyledHeader = styled(Typography)`
  margin-top: 24px;
`;
const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

const PlaceHolder = styled.div`
  width: 16px;
`;

const MissionsPage = ({ firestore }) => {
  let history = useHistory();
  useFirestoreConnect([{ collection: "missions" }]);
  const missions = useSelector((state) => state.firestore.ordered.missions);

  const user = useSelector((state) => state.firebase.auth);

  function TakeToMap() {
    alert("this should take you to the map!");
  }

  function volunteerForMission(missionId) {
    User.assginedToMission(firestore, missionId, user.uid);
  }

  return (
    <Page template="pink">
      <StyledHeader variant="h1"> Missions </StyledHeader>
      {missions?.map((mission) => (
        <Card key={mission.id}>
          <MissionCard mission={mission} />

          <Grid container justify="center" alignItems="center">
            <StyledButton
              color="primary"
              size="large"
              variant="contained"
              disableElevation
              onClick={() => volunteerForMission(mission.id)}
            >
              Volunteer
            </StyledButton>
            <PlaceHolder />
            <StyledButton
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => {
                history.push(`/missions/${mission.id}`);
              }}
            >
              Details
            </StyledButton>
          </Grid>
        </Card>
      ))}
    </Page>
  );
};
export default withFirestore(MissionsPage);
