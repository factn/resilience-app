import React, { useState } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";

import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import Page from "../../layout/Page";
import { color } from "../../../theme";

import { Grid, Dialog } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { makeStyles } from "@material-ui/core/styles";

// Created based on the schema in firebase
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Missions, MissionFundedStatus, MissionStatus } from "../../model";

import MissionDetailsCard from "../../component/MissionDetailsCard";
import MissionDeliveredCard from "../../component/MissionDeliveredCard";
import { ErrorSnackbar, SuccessSnackbar } from "../../component/Snackbars";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(1, 2, 2, 2),
  },
  goBackIcon: {
    fontSize: 32,
    fill: color.deepPurple,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

/**
 * Component for showing mission details
 *
 * @component
 */
const MissionDetailsPage = ({ firestore, auth, mission, history }) => {
  const classes = useStyles();
  mission = mission || {};
  const [userUnverifiedPopupOpen, setUserUnverifiedPopupOpen] = useState(false);
  const [completeDeliveryDialogOpen, setCompleteDeliveryDialogOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  function volunteerForMission(missionId) {
    if (!auth.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      Missions.volunteerForMission(missionId, auth.uid);
    }
  }

  function startMission(missionId) {
    if (!auth.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      Missions.startMission(missionId);
    }
  }

  function openMissionDeliveredCard(missionId) {
    //open the submit delivery modal
    if (!auth.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      setCompleteDeliveryDialogOpen(true);
    }
  }

  async function markMissionAsDelivered(missionId, confirmationImage) {
    try {
      await Missions.deliveredMission(missionId, confirmationImage);
      console.log("marked mission as delivered");
      setCompleteDeliveryDialogOpen(false);
      setSuccessSnackbarOpen(true);
    } catch (e) {
      console.error(e);
      setErrorSnackbarOpen(true);
    }
  }

  //mock data
  mission = {
    ...mission,
    fundedStatus: MissionFundedStatus.fundedbydonation,
    pickUpWindow: "1:30 PM",
    pickUplocation: "123 Strawberry Ln, VA 22201",
    deliveryWindow: "2:30–3:30 PM",
    deliverylocation: "123 Strawberry Ln, VA 22201",
    recipientName: "John Doe",
    recipientPhoneNumber: "(123) 456-7890",
  };
  const volunteer = {
    profileName: "Jane",
    avatar: "https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg",
  };

  return (
    <Page key="mission-detail" isLoaded={isLoaded(mission)} isEmpty={isEmpty(mission)}>
      <Grid className={classes.content} direction="column" container>
        <Grid align="left" item>
          <ArrowBackIcon
            align="left"
            className={classes.goBackIcon}
            onClick={() => history.goBack()}
          />
        </Grid>
        <Grid align="left" item>
          <MissionDetailsCard
            mission={mission}
            volunteer={volunteer}
            volunteerForMission={volunteerForMission}
            startMission={startMission}
            openMissionDeliveredCard={openMissionDeliveredCard}
            userUnverifiedPopupOpen={userUnverifiedPopupOpen}
            setUserUnverifiedPopupOpen={setUserUnverifiedPopupOpen}
            history={history}
          />
        </Grid>
      </Grid>
      <Dialog
        open={completeDeliveryDialogOpen}
        onClose={() => setCompleteDeliveryDialogOpen(false)}
        aria-labelledby="Complete delivery"
        maxWidth="md"
        scroll="body"
      >
        <MissionDeliveredCard
          missionId={mission.id}
          completeMission={markMissionAsDelivered}
          onClose={() => setCompleteDeliveryDialogOpen(false)}
        />
      </Dialog>
      <ErrorSnackbar
        open={errorSnackbarOpen}
        handleClose={() => setErrorSnackbarOpen(false)}
        errorMessage="Error while marking the mission as delivered"
        autoHideDuration={3000}
      />
      <SuccessSnackbar
        open={successSnackbarOpen}
        handleClose={() => setSuccessSnackbarOpen(false)}
        successMessage="Mission has been marked as delivered"
        autoHideDuration={3000}
      />
    </Page>
  );
};

MissionDetailsPage.defaultProps = {
  mission: {},
};

MissionDetailsPage.propTypes = {
  /**
   * Firebase store
   */
  firestore: PropTypes.object.isRequired,
  /**
   * Auth token
   */
  auth: PropTypes.shape({
    phoneNumber: PropTypes.string,
    uid: PropTypes.string,
  }),
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    status: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    details: PropTypes.any,
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const missionId = ownProps.match.params.id;
  const mission = {
    id: missionId,
    ...(state.firestore.data.missions && state.firestore.data.missions[missionId]),
  };
  return {
    auth: state.firebase.auth,
    missionId,
    mission,
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    const missionId = props.missionId;
    if (!props.auth.uid) return [];
    return [
      {
        collection: "missions",
        doc: missionId,
      },
    ];
  })
)(MissionDetailsPage);
