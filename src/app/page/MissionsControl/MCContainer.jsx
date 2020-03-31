import React from "react";
import { useFirestore, firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Typography, Button, Grid } from "@material-ui/core";
import styled from "styled-components";

import { Page, Card } from "../../layout";
import { User, Mission } from "../../model";
import { compose } from "redux";

import MissionsControlView from "./Missions";

const MissionsPage = ({ user, history, firebase, ...rest }) => {
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
