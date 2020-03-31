import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Typography, Button, Grid } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { MissionCard } from "../../component";
import { compose } from "redux";

const StyledHeader = styled(Typography)`
  margin-top: 24px;
`;
const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

const MissionsPage = ({ auth, history, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsCreated);

  return (
    <Page template="pink">
      <StyledHeader variant="h1"> My Requests</StyledHeader>

      {missions?.map((mission) => (
        <Card key={mission.id}>
          <MissionCard mission={mission} key={`preview-${mission.id}`} />

          <Grid container justify="center" alignItems="center">
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        where: [["ownerId", "==", props.auth.uid]],
        storeAs: "missionsCreated",
      },
    ];
  })
)(withRouter(MissionsPage));

//export default withFirestore(MissionsPage);
