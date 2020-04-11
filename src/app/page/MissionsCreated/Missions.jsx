import React from "react";
import PropTypes from "prop-types";
import { firestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { useSelector, connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Page } from "../../layout";
import { compose } from "redux";
import { MissionList } from "../../component/";

/**
 * Component for listing created missions
 *
 * @component
 */
const MissionsPage = ({ auth, history, ...rest }) => {
  const missions = useSelector((state) => state.firestore.ordered.missionsCreated);

  return (
<<<<<<< HEAD
    <Page title="My Requests">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="You have not created any missions"
      />
=======
    <Page template="pink" isLoaded={isLoaded(missions)} isEmpty={isEmpty(missions)}>
      <StyledHeader variant="h1"> My Requests</StyledHeader>

      {missions?.map((mission) => (
        <Card key={mission.id}>
          <MissionCard mission={mission} />

          <Grid container justify="center" alignItems="center">
            <StyledButton
              variant="outlined"
              size="large"
              color="secondary"
              onClick={() => {
                history.push(`/missions/${mission.id}`);
              }}
            >
              Details
            </StyledButton>
          </Grid>
        </Card>
      ))}
>>>>>>> change nzme from missions control to dashboard
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
