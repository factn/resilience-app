import PropTypes from "prop-types";
import React from "react";
import { connect, useSelector } from "react-redux";
import { firestoreConnect, isEmpty, isLoaded } from "react-redux-firebase";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

import { MissionList } from "../../component";
import { Page } from "../../layout";

/**
 * Component for listing created missions
 *
 * @component
 */
const MissionsPage = ({ auth, history }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsCreated);

  return (
    <Page title="My Requests">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="You have not created any missions"
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
        where: [["ownerId", "==", props.auth.uid]],
        storeAs: "missionsCreated",
      },
    ];
  })
)(withRouter(MissionsPage));
