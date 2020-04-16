import React from "react";
import PropTypes from "prop-types";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Page } from "../layout";
import { MissionList } from "../component";
import { compose } from "redux";
import { User, Mission } from "../model";

/**
 * Component for listing volunteered missions
 *
 * @component
 */
const MissionsPage = ({ auth, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsVolunteered);
  async function startMission(missionId) {
    // We need a little more information from user at this point
    User.startMission(auth.uid, missionId);
  }

  return (
    <Page title="Missions Assigned">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="You have not volunteered for any missions!"
        callToAction={{
          text: "Start Mission",
          onClick: startMission,
        }}
      />
    </Page>
  );
};

MissionsPage.propTypes = {
  /**
   * Auth token
   */
  auth: PropTypes.shape({
    uid: PropTypes.string.isRequired,
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
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        where: [
          ["volunteerId", "==", props.auth.uid],
          ["status", "==", Mission.Status.assigned],
        ],
        storeAs: "missionsVolunteered",
      },
    ];
  })
)(withRouter(MissionsPage));
