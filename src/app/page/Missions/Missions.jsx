import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Page } from "../../layout";
import { Mission } from "../../model";
import { MissionList } from "../../component";
import { compose } from "redux";

import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

/**
 * Component for listing missions
 *
 * @param {object} props.auth - Object obtained from firebase.auth state
 * @param {object} props.history - Object obtained from React Router
 */
const MissionsPage = ({ auth, history, missions }) => {
  const [popupOpen, setPopupOpen] = useState(false);

  async function userVolunteeringHandler(missionId) {
    // We need a little more information from user at this point
    if (!auth.phoneNumber) {
      setPopupOpen(true);
      return;
    }
    Mission.volunteerForMission(missionId, auth.uid);
  }

  if (!missions) return null;

  return (
    <Page title="Missions">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="There are no missions available"
        handleUserVolunteering={userVolunteeringHandler}
      />
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

const mapStateToProps = (state, ownProps) => {
  let missions = state.firestore.ordered.missionsUnassigned;
  missions = missions ? missions : [];
  if (missions[0]) {
    console.log(missions[0]);
    console.log(Mission.load(missions[0]));
  }

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
