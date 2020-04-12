import React from "react";
import PropTypes from "prop-types";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Page } from "../../layout";
import { MissionList } from "../../component";
import { compose } from "redux";

/**
 * Component for listing volunteered missions
 *
 * @component
 */
const MissionsPage = ({ auth, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsVolunteered);

  return (
    <Page template="pink">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="You have not volunteered for any missions!"
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
        where: [["volunteerId", "==", props.auth.uid]],
        storeAs: "missionsVolunteered",
      },
    ];
  })
)(withRouter(MissionsPage));
