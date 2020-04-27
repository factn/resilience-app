import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { MissionList } from "../../component";
import { Page } from "../../layout";
import { User } from "../../model";

/**
 * Component for listing missions
 *
 * @param {object} props.auth - Object obtained from firebase.auth state
 * @param {object} props.history - Object obtained from React Router
 */
const MissionsCompleted = ({ auth, history }) => {
  const [completedMissions, updateCompletedMissions] = useState([]);

  useEffect(() => {
    const fetchCompletedMissions = async () => {
      const missions = await User.getAllCompletedMissions(auth.uid);

      updateCompletedMissions(missions);
    };

    fetchCompletedMissions();
  }, [auth.uid]);

  return (
    <Page title="Missions Completed">
      <MissionList
        missions={completedMissions}
        history={history}
        isEmpty={isEmpty(completedMissions)}
        isLoaded={isLoaded(completedMissions)}
        isEmptyText="No completed missions (yet)."
      />
    </Page>
  );
};

MissionsCompleted.propTypes = {
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

export default compose(connect(mapStateToProps))(withRouter(MissionsCompleted));
