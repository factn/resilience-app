import { Card, CardContent, CardHeader, Grid } from "@material-ui/core";
import { withStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import PersonIcon from "@material-ui/icons/Person";
import PublishIcon from "@material-ui/icons/Publish";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PropTypes from "prop-types";
import React from "react";
import appleIcon from "../../../img/apple.svg";
import { H5, Body1 } from "../Typography";
import DetailsText from "../../dashboard/Missions/DetailsText";

import AcceptMissionButton from "./AcceptMissionButton";
import UnassignMeButton from "./UnassignMeButton";

import StartMissionButton from "./StartMissionButton";
import DeliverMissionButton from "./DeliverMissionButton";
import { useSelector } from "react-redux";
import { MissionStatus } from "../../model/schema";

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
      },
    },
  });
const styles = (theme) => ({
  cardHeader: {
    paddingBottom: theme.spacing(0),
  },
  cardContent: {
    padding: theme.spacing(1),
    paddingTop: theme.spacing(0),
  },
  missionSummary: {
    backgroundColor: "#eeeeee",
  },
  rowBody: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    display: "flex",
  },
  center: {
    alignItems: "center",
    width: "100%",
  },
  halfRow: {
    width: "50%",
  },
  title: {
    width: "90%",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  address: {
    "& .MuiTypography-h5": {
      width: "50%",
      textOverflow: "ellipsis",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
  },
});

const MissionCardContent = ({ classes, contentItems }) => (
  <Grid container spacing={1} alignItems="center">
    {contentItems.map((contentItem, index) => {
      const Icon = contentItem.icon;
      const content = contentItem.content;

      return (
        <React.Fragment key={`content-item-${index + 1}`}>
          <Grid item xs={1}>
            <Icon color="primary" />
          </Grid>
          <Grid item xs={11}>
            <Body1>{content}</Body1>
          </Grid>
        </React.Fragment>
      );
    })}
  </Grid>
);
/**
 * Component for displaying mission information on a card
 *
 * @component
 */
const MissionCard = withStyles(styles)(({ children, classes, mission }) => {
  const status = mission.status;
  const detailsLink = "/missions/" + mission.uid;
  const location = mission.pickUpLocation?.address || "no data";
  const dropOffLocation = mission.deliveryLocation?.address || "no data";
  const timeWindowType = mission.pickUpWindow?.timeWindowType || "no data";
  const startTime = mission.pickUpWindow?.startTime;
  const firebaseProfile = useSelector((state) => state.firebase.profile);
  const user = firebaseProfile;

  const contentItems = [
    {
      icon: PersonIcon,
      content: status,
    },
    {
      icon: LocationOnIcon,
      content: location,
    },
    {
      icon: ScheduleIcon,
      content: typeof startTime === "string" ? startTime : timeWindowType,
    },
  ];

  return (
    <ThemeProvider theme={(theme) => createCustomTheme(theme)}>
      <Card variant="outlined">
        <CardHeader
          action={<InfoOutlinedIcon />}
          title={<DetailsText showType={false} mission={mission} />}
          avatar={<img height="20" src={appleIcon} alt="" />}
        />
        <CardContent className={classes.cardContent}>
          <Grid container direction="row">
            <Grid item className={classes.halfRow}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <PublishIcon />
                    </Grid>
                    <Grid item>
                      <H5 noWrap>PICK UP</H5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>{mission.pickUpLocation.label}</Grid>
                <Grid item className={classes.address}>
                  <H5>
                    <a title={location} href={`https://www.google.com/maps/dir/"${location}"`}>
                      {location}
                    </a>
                  </H5>
                </Grid>
                <Grid item>
                  <Grid container direction="row" spacing={1}>
                    <Grid item>
                      <ScheduleIcon />
                    </Grid>
                    <Grid item>{startTime}</Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.halfRow}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container direction="row">
                    <Grid item>
                      <GetAppIcon />
                    </Grid>
                    <Grid item>
                      <H5 noWrap>DROP OFF</H5>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>{mission.recipientDisplayName}</Grid>
                <Grid item className={classes.address}>
                  <H5>
                    <a
                      title={dropOffLocation}
                      href={`https://www.google.com/maps/dir/"${dropOffLocation}"`}
                    >
                      {dropOffLocation}
                    </a>
                  </H5>
                </Grid>
                {mission.status === MissionStatus.tentative && (
                  <AcceptMissionButton mission={mission} user={user} />
                )}
              </Grid>
            </Grid>
          </Grid>
          {(mission.status === MissionStatus.assigned ||
            mission.status === MissionStatus.started) && (
            <Grid container direction="row">
              <Grid
                item
                className={classes.halfRow}
                alignItems={"center"}
                justify={"center"}
                style={{ width: "50%" }}
              >
                {mission.status === MissionStatus.assigned && (
                  <UnassignMeButton mission={mission} user={user} />
                )}
              </Grid>
              <Grid item className={classes.halfRow}>
                <div>
                  {mission.status === MissionStatus.assigned && (
                    <StartMissionButton mission={mission} user={user} />
                  )}
                  {mission.status === MissionStatus.started && (
                    <DeliverMissionButton mission={mission} user={user} />
                  )}
                </div>
              </Grid>
            </Grid>
          )}
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
    details: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    }),
    address: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postalCode: PropTypes.string,
  }),
};

export default MissionCard;
