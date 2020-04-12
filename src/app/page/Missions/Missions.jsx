import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFirestore, firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Page } from "../../layout";
import { User } from "../../model";
import { MissionList } from "../../component";
import { compose } from "redux";

import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";

/**
 * Component for listing missions
 *
 * @param {object} props.user - Object obtained from firebase.auth state
 * @param {object} props.history - Object obtained from React Router
 */
const MissionsPage = ({ user, history, error, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firebase.ordered.missionsTodo);
  const missionsEmpty = isEmpty(missions);
  const missionsLoaded = isLoaded(missions);

  const [popupOpen, setPopupOpen] = useState(false);
  const firestore = useFirestore();

  function userVolunteeringHandler(missionId) {
    // We need a little more information from user at this point
    if (!user.phoneNumber) {
      setPopupOpen(true);
      return;
    }

    User.assignAsVolunteer(firestore, missionId, user.uid);
    return;
  }

  return (
    <Page title="Missions">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={missionsEmpty}
        isLoaded={missionsLoaded}
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
  user: PropTypes.shape({
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
