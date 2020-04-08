import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Typography, Button, Grid } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { User } from "../../model";
import { MissionCard } from "../../component";
import Popup from "../../component/Popup";
import { compose } from "redux";

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

const MissionsPage = ({ user, history, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsTodo);
  const firestore = useFirestore();
  const [popupOpen, setPopupOpen] = useState(false);

  function handlePopupClose() {
    setPopupOpen(false);
  }
  function volunteerForMission(missionId) {
    if (!user.phoneNumber) {
      setPopupOpen(true);
    } else {
      User.assignAsVolunteer(firestore, missionId, user.uid);
    }
  }

  if (!missions) {
    return <div> isloading...</div>;
  }
  return (
    <Page template="pink">
      <StyledHeader variant="h1"> Missions </StyledHeader>

      {missions.map((mission) => (
        <Card key={mission.id}>
          <MissionCard mission={mission} key={`preview-${mission.id}`} />

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
      <Popup
        title="Add a Phone Number"
        open={popupOpen}
        handleClose={handlePopupClose}
        btnText="Close"
      >
        <Grid container justify="center" spacing={1}>
          <Grid item>
            <Typography variant="h5">
              You need to add and verify your phone number to volunteer for a Mission.
            </Typography>
          </Grid>
          <Grid item>
            <Link to="/user/profile">Go to Profile Page to add Phone number</Link>
          </Grid>
        </Grid>
      </Popup>
    </Page>
  );
};

MissionsPage.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
  }),
  history: PropTypes.object.isRequired,
  firebase: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.firebase.auth,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "missions",
        where: [["status", "==", "todo"]],
        storeAs: "missionsTodo",
      },
    ];
  })
)(withRouter(MissionsPage));
