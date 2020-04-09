import React from "react";
import { firestoreConnect } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { Mission } from "../../model";
import { compose } from "redux";
import { Button } from "../../component";
import { Grid } from "@material-ui/core";
import MissionsControlView from "./Missions";
import { Page } from "../../layout";

const MissionsPage = ({ auth, user, history, firebase, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missions);
  const users = useSelector((state) => state.firestore.ordered.users);

  return (
    <Page maxWidth template="pink">
      <Grid container justify="center" spacing={1}>
        <Grid item>
          <Link to="/missions/new">
            <Button text="Create Mission" />
          </Link>
        </Grid>
      </Grid>
      <MissionsControlView
        missionsNotStarted={Mission.filterByStatus(missions, "notStarted")}
        missionsQueued={Mission.filterByStatus(missions, "queued")}
        missionsInProgress={Mission.filterByStatus(missions, "inProgress")}
        missionsPending={Mission.filterByStatus(missions, "pending")}
        missionsFinished={Mission.filterByStatus(missions, "finished")}
        volunteered={users}
      />
    </Page>
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
