import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { CircularProgress, Typography, Button, Grid } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { User } from "../../model";
import { MissionCard } from "../../component";
import { compose } from "redux";

import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

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

/**
 * Component for listing missions
 *
 * @component
 */
const MissionsPage = ({ user, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsTodo);
  const firestore = useFirestore();
  const [popupOpen, setPopupOpen] = useState(false);

  function volunteerForMission(missionId) {
    if (!user.phoneNumber) {
      setPopupOpen(true);
    } else {
      User.assignAsVolunteer(firestore, missionId, user.uid);
    }
  }

  return (
    <Page template="pink">
      <StyledHeader variant="h1"> Missions </StyledHeader>
      {missions ? (
        missions.map((mission) => (
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
        ))
      ) : (
        <CircularProgress />
      )}
      <UserPhoneUnverifiedPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
    </Page>
  );
};

MissionsPage.propTypes = {
  /**
   * User info
   */
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
  }),
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
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
