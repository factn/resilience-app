import { Card, Box, CardContent, Grid, Typography, Button } from "@material-ui/core";
import { withStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PublishIcon from "@material-ui/icons/Publish";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PropTypes from "prop-types";
import React, { useState } from "react";
import DetailsText from "./DetailsText";

import AcceptMissionButton from "./AcceptMissionButton";
import UnassignMeButton from "./UnassignMeButton";

import StartMissionButton from "./StartMissionButton";
import DeliverMissionButton from "./DeliverMissionButton";
import { useSelector } from "react-redux";
import { MissionStatus } from "../../model/schema";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import { Mission } from "../../model";
import Dialog from "@material-ui/core/Dialog";
import MissionDetailsCard from "./MissionDetailsCard";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const createCustomTheme = (theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      ...theme.overrides,
      MuiCardHeader: {
        root: {
          backgroundColor: "whitesmoke",
          height: theme.spacing(3),
        },
        action: {
          marginTop: "-11px",
          color: "rgba(0, 0, 0, 0.54)",
        },
        content: {
          textAlign: "left",
        },
        avatar: {
          marginRight: "8px",
          marginTop: "3px",
        },
      },
      MuiCardContent: {
        root: {
          padding: theme.spacing(1),
          paddingBottom: 0,
        },
      },
    },
  });
const styles = (theme) => ({
  column: {
    paddingRight: theme.spacing(2),
  },
  onTopOfNotReady: {
    zIndex: 2,
    position: "relative",
  },
  pickup: {
    color: theme.palette.success.main,
    fontWeight: 600,
    letterSpacing: "1px",
    fontSize: "12px",
  },
  dropoff: {
    color: theme.color.red,
    fontWeight: 600,
    letterSpacing: "1px",
    fontSize: "12px",
  },
  address: {
    width: "100%",
  },
  addressLabel: {
    ...theme.typography.body2,
    minHeight: theme.typography.body1.lineHeight,
    fontWeight: "bold",
    textAlign: "left",
  },
  time: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  root: {
    position: "relative",
  },
  notReadyToStart: {
    background: "rgba(245, 245, 245, 0.9)",
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
  },
  notReadyToStartLabel: {
    backgroundColor: "#ECB22E",
    borderRadius: "4px",
    color: theme.color.white,
    width: "80%",
  },

  missionDetailsWrapper: {
    padding: theme.spacing(2),
    height: "80vh",
    maxWidth: "450px",
    boxSizing: "border-box",
    margin: 0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.color.blue,
    zIndex: 1,
  },
  actionButtons: {},
  greyBox: {
    background: "#F5F5F5",
    cursor: "pointer",
    margin: "-12px -12px 6px -12px",
    padding: "12px",
  },
  detailsText: {
    fontSize: "16px",
  },
});

/**
 * Component for displaying mission information on a card
 *
 * @component
 */
const MissionCard = withStyles(styles)(({ classes, mission }) => {
  const location = mission.pickUpLocation?.address || "no data";
  const dropOffLocation = mission.deliveryLocation?.address || "no data";
  const startTime = "" + (mission.pickUpWindow?.startTime || "");
  const firebaseProfile = useSelector((state) => state.firebase.profile);
  const user = firebaseProfile;
  const fullScreen = useMediaQuery("(max-width:481px)");
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const onCloseModal = () => setModalOpen(false);

  const ActionButtons = () => (
    <Grid container direction="row-reverse" className={classes.actionButtons}>
      {mission.status === MissionStatus.tentative && (
        <Grid item xs={6}>
          <AcceptMissionButton mission={mission} user={user} />
        </Grid>
      )}
      {mission.status === MissionStatus.assigned && (
        <Grid item xs={6}>
          <StartMissionButton mission={mission} user={user} disabled={!mission.readyToStart} />
        </Grid>
      )}
      {mission.status === MissionStatus.assigned && (
        <Grid item xs={6} className={classes.onTopOfNotReady}>
          <UnassignMeButton mission={mission} user={user} />
        </Grid>
      )}
      {mission.status === MissionStatus.started && (
        <Grid item xs={6}>
          {modalOpen ? (
            <DeliverMissionButton mission={mission} user={user} />
          ) : (
            <Button onClick={handleOpenModal} variant="contained" color="primary">
              Confirm Delivery
            </Button>
          )}
        </Grid>
      )}
    </Grid>
  );

  return (
    <ThemeProvider theme={(theme) => createCustomTheme(theme)}>
      <Dialog open={modalOpen} onClose={onCloseModal} fullScreen={fullScreen}>
        <MuiDialogTitle>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onCloseModal}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent>
          <MissionDetailsCard mission={mission} />
        </MuiDialogContent>
        <MuiDialogActions>
          <ActionButtons />
        </MuiDialogActions>
      </Dialog>
      <Card variant="outlined" className={classes.root}>
        {!mission.readyToStart && mission.status === Mission.Status.assigned && (
          <Grid container className={classes.notReadyToStart} alignItems="center" justify="center">
            <Grid
              className={classes.notReadyToStartLabel}
              container
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <ReportProblemOutlinedIcon />
              </Grid>
              Mission not yet ready to start
            </Grid>
          </Grid>
        )}
        <CardContent className={classes.cardContent}>
          <Box onClick={handleOpenModal} className={classes.greyBox}>
            <Box position="relative">
              <Box position="absolute" right={0} top={0}>
                <InfoOutlinedIcon />
              </Box>
            </Box>
            <Box fontSize="12px" fontWeight="bold" className={classes.detailsText}>
              <DetailsText mission={mission} />
            </Box>
          </Box>
          <Grid container direction="row">
            <Grid item xs={6} container direction="column" className={classes.column}>
              <Grid item xs container alignItems="center" className={classes.pickup}>
                <Grid item>
                  <PublishIcon />
                </Grid>
                <Grid item>PICK UP</Grid>
              </Grid>
              <Grid item xs className={classes.addressLabel}>
                {mission.pickUpLocation?.label}
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography noWrap>
                  <a title={location} href={`https://www.google.com/maps/dir/"${location}"`}>
                    {location}
                  </a>
                </Typography>
              </Grid>
              <Grid
                item
                xs
                zeroMinWidth
                container
                alignItems="center"
                wrap="nowrap"
                className={classes.time}
              >
                <ScheduleIcon />
                {startTime}
              </Grid>
            </Grid>
            <Grid item xs={6} container direction="column" className={classes.column}>
              <Grid item container className={classes.dropoff} alignItems="center">
                <Grid item>
                  <GetAppIcon />
                </Grid>
                <Grid item>DROP OFF</Grid>
              </Grid>
              <Grid item className={classes.addressLabel}>
                {mission.recipientDisplayName}
              </Grid>
              <Grid item className={classes.address} zeroMinWidth>
                <Typography noWrap>
                  <a
                    title={dropOffLocation}
                    href={`https://www.google.com/maps/dir/"${dropOffLocation}"`}
                  >
                    {dropOffLocation}
                  </a>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <ActionButtons />
        </CardContent>
      </Card>
    </ThemeProvider>
  );
});

MissionCard.propTyes = {
  /**
   * Mission details
   */
  mission: PropTypes.shape({
    status: PropTypes.string,
    url: PropTypes.string,
    pickUpWindow: PropTypes.shape({
      timeWindowType: PropTypes.string,
      startTime: PropTypes.string,
    }),
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};

export default MissionCard;
