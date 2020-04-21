import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Page } from "../../layout";
import { Mission, User } from "../../model";
import { MissionList } from "../../component";
import { compose } from "redux";
import Snackbar from "../../component/Snackbars/Snackbar";

import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

/**
 * Component for listing missions
 *
 * @param {object} props.auth - Object obtained from firebase.auth state
 * @param {object} props.history - Object obtained from React Router
 */
const MissionsPage = ({ auth, history, missions }) => {
  const initSnackbarState = {
    open: false,
    type: "error",
    message: "",
  };
  const [popupOpen, setPopupOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(initSnackbarState);

  async function userVolunteeringHandler(missionId) {
    // We need a little more information from user at this point
    if (!auth.phoneNumber) {
      setPopupOpen(true);
      return;
    }
    User.volunteerMission(auth.uid, missionId)
      .then((res) => {
        setSnackbar({
          open: true,
          type: "success",
          message: "You have accepted this mission",
        });
      })
      .catch((error) => {
        setSnackbar({
          open: true,
          type: "error",
          message: "Could not accept mission. Please try again",
        });
      });
  }

  if (!missions) return null;

  return (
    <Page title="Missions Available">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="There are no missions available"
        callToAction={{
          text: "Accept Mission",
          onClick: (missionId) => userVolunteeringHandler(missionId),
        }}
        handleUserVolunteering={userVolunteeringHandler}
      />
      <UserPhoneUnverifiedPopup open={popupOpen} handleClose={() => setPopupOpen(false)} />
      <Snackbar
        autoHideDuration={4000}
        handleClose={() => setSnackbar({ open: false })}
        open={snackbar.open}
        type={snackbar.type}
        message={snackbar.message}
      />
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

const mapStateToProps = (state, ownProps) => {
  let missions = state.firestore.ordered.missionsUnassigned;
  missions = Mission.loads(missions);
  return {
    missions: missions,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "missions",
        where: [["status", "==", "unassigned"]],
        storeAs: "missionsUnassigned",
      },
    ];
  })
)(withRouter(MissionsPage));
