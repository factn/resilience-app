import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Page } from "../../layout";
import { Missions } from "../../model";
import { MissionList } from "../../component";
import { compose } from "redux";

import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

/**
 * Component for listing missions
 *
 * @param {object} props.auth - Object obtained from firebase.auth state
 * @param {object} props.history - Object obtained from React Router
 */
const MissionsPage = ({ auth, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsTodo);

  const [popupOpen, setPopupOpen] = useState(false);
  const firestore = useFirestore();

  async function userVolunteeringHandler(missionId) {
    // We need a little more information from user at this point
    if (!auth.phoneNumber) {
      setPopupOpen(true);
      return;
    }

    await Missions.volunteerForMission(missionId, auth.uid);
    return;
  }

  return (
<<<<<<< HEAD
    <Page title="Missions">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="There are no missions available"
        handleUserVolunteering={userVolunteeringHandler}
      />
=======
    <Page>
      <StyledHeader variant="h1"> Missions </StyledHeader>
      {missions ? (
        missions.map((mission) => (
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
        ))
      ) : (
        <CircularProgress />
      )}
>>>>>>> change nzme from missions control to dashboard
      <UserPhoneUnverifiedPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
    </Page>
  );
};

MissionsPage.propTypes = {
  /**
   * User info
   */
  auth: PropTypes.shape({
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
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
