import React from "react";
import { connect } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { compose } from "redux";
import Box from "@material-ui/core/Box";
import { useFirestoreConnect } from "react-redux-firebase";
import { MissionList } from "../../component";
import { Page } from "../../layout";
import { useOrganization } from "../../model";
import Mission from "../../model/Mission";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
}));

const MissionsDelivered = ({ currentUser, missions }) => {
  const classes = useStyles();
  const org = useOrganization();
  useFirestoreConnect(() => {
    return [Mission.fsCompletedUserMissions(org.uid, currentUser.uid)];
  });
  return (
    <Page title="Done">
      <Box className={classes.content}>
        <MissionList
          missions={missions}
          isEmpty={isEmpty(missions)}
          isLoaded={isLoaded(missions)}
          isEmptyText="No completed missions (yet)."
        />
      </Box>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.firebase.auth,
    missions: state.firestore.ordered.completedUserMissions,
  };
};

export default compose(connect(mapStateToProps))(MissionsDelivered);
