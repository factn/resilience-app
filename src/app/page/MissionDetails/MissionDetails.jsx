import { Dialog, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { isEmpty, isLoaded, useFirebase } from "react-redux-firebase";

import { color } from "../../../theme";
import MissionDeliveredCard from "../../component/MissionDeliveredCard";
import MissionDetailsCard from "../../component/MissionDetailsCard";
import { ErrorSnackbar, SuccessSnackbar } from "../../component/Snackbars";
import Page from "../../layout/Page";
import { Mission, User } from "../../model";

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
const MissionDetailsPage = ({ history, match }) => {
  const classes = useStyles();
  const currentUser = useFirebase().auth().currentUser;

  const [userUnverifiedPopupOpen, setUserUnverifiedPopupOpen] = useState(false);
  const [completeDeliveryDialogOpen, setCompleteDeliveryDialogOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [mission, setMission] = useState({});

  useEffect(() => {
    const missionUid = match.params.id;
    const fetchMissionById = async () => {
      const mission = await Mission.getById(missionUid);
      setMission(mission);
    };
    fetchMissionById();
  }, [match.params.id]);

  function volunteerForMission(missionUid) {
    if (!currentUser.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      Mission.accept(currentUser.uid, currentUser, missionUid);
    }
  }

  function startMission(missionUid) {
    if (!currentUser.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      User.startMission(currentUser.uid, missionUid);
    }
  }

  function openMissionDeliveredCard() {
    //open the submit delivery modal
    if (!currentUser.phoneNumber) {
      setUserUnverifiedPopupOpen(true);
    } else {
      setCompleteDeliveryDialogOpen(true);
    }
  }

  async function markMissionAsDelivered(missionUid) {
    try {
      await User.deliverMission(currentUser.uid, missionUid);
      setCompleteDeliveryDialogOpen(false);
      setSuccessSnackbarOpen(true);
    } catch (e) {
      setErrorSnackbarOpen(true);
    }
  }

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
          missionUid={mission.uid}
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

export default MissionDetailsPage;

MissionDetailsPage.defaultProps = {
  mission: {},
};

MissionDetailsPage.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object,

  match: PropTypes.object,
};
