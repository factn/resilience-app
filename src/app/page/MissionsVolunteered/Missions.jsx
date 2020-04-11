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
<<<<<<< HEAD
    <Page title="Volunteered Missions">
      <MissionList
        missions={missions}
        history={history}
        isEmpty={isEmpty(missions)}
        isLoaded={isLoaded(missions)}
        isEmptyText="You have not volunteered for any missions!"
      />
=======
    <Page template="pink">
      <StyledHeader variant="h1"> Missions </StyledHeader>

      {missions ? (
        missions.map((mission) => (
          <Card key={mission.id}>
            <MissionCard mission={mission} />

            <Grid container justify="center" alignItems="center">
              <StyledButton
                color="primary"
                size="large"
                variant="contained"
                disableElevation
                onClick={() => volunteerForMission(mission.id)}
              >
                Volunteer
              </StyledButton>
              <PlaceHolder />
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
        ))
      ) : (
        <CircularProgress />
      )}
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
        where: [["volunteerId", "==", props.auth.uid]],
        storeAs: "missionsVolunteered",
      },
    ];
  })
)(withRouter(MissionsPage));
