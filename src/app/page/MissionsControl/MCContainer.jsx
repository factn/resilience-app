import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Mission } from "../../model";
import { compose } from "redux";
import { Button } from "../../component";
import MissionsControlView from "./Missions";

const MissionsPage = ({ user, history, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missions);
  const users = useSelector((state) => state.firestore.ordered.users);

  return (
    <>
      <MissionsControlView
        missionsNotStarted={Mission.filterByStatus(missions, "notStarted")}
        missionsQueued={Mission.filterByStatus(missions, "queued")}
        missionsInProgress={Mission.filterByStatus(missions, "inProgress")}
        missionsPending={Mission.filterByStatus(missions, "pending")}
        missionsFinished={Mission.filterByStatus(missions, "finished")}
        volunteered={users}
      />
      <Link to="missions/new">
        <Button text="Create Mission" />
      </Link>
    </>
  );
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

//export default withFirestore(MissionsPage);
