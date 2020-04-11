import React from "react";
import PropTypes from "prop-types";
import { firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Mission } from "../../model";
import { compose } from "redux";

import MissionsControlView from "./MissionControlerView";

/**
 * Component for controlling missions status
 *
 * @component
 */
const MissionsPage = ({ user, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missions);
  const users = useSelector((state) => state.firestore.ordered.users);

  return (
    <MissionsControlView
      missionsNotStarted={Mission.filterByStatus(missions, "notStarted")}
      missionsQueued={Mission.filterByStatus(missions, "queued")}
      missionsInProgress={Mission.filterByStatus(missions, "inProgress")}
      missionsPending={Mission.filterByStatus(missions, "pending")}
      missionsFinished={Mission.filterByStatus(missions, "finished")}
      volunteered={users}
    />
  );
};

MissionsPage.propTypes = {
  /**
   * User info
   */
  user: PropTypes.object,
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
    return [{ collection: "missions" }, { collection: "users" }];
  })
)(withRouter(MissionsPage));
