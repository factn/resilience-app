import { Card, CardActions, CardContent, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import InfoIcon from "@material-ui/icons/Info";
import PersonIcon from "@material-ui/icons/Person";
import PublishIcon from "@material-ui/icons/Publish";
import ScheduleIcon from "@material-ui/icons/Schedule";
import PropTypes from "prop-types";
import React from "react";
import appleIcon from "../../img/apple.svg";
import { Button, H5, Body1 } from "./";
import User from "../model/User";
import Mission from "../model/Mission";
import { useSelector } from "react-redux";

const styles = (theme) => ({
  root: {
    textAlign: "left",
    margin: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.color.secondary,
  },
  cardHeader: {
    paddingBottom: theme.spacing(0),
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
  rowBody: {
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    display: "flex",
  },
  center: {
    alignItems: "center",
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

// Can migrate this to util file later
/* eslint-disable */
const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);
/* eslint-enable*/

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
const MissionCard = withStyles(styles)(({ children, classes, mission, ...rest }) => {
  const title = mission?.notes || "No title supplied.";
  const status = mission.status;
  const location = mission.pickUpLocation?.address || "no data";
  const dropOffLocation = mission.deliveryLocation?.address || "no data";
  const timeWindowType = mission.pickUpWindow?.timeWindowType || "no data";
  const startTime = mission.pickUpWindow?.startTime;
  const firebaseProfile = useSelector((state) => state.firebase.profile);

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

  function acceptMission(e) {
    e.preventDefault();
    const user = firebaseProfile;
    Mission.accept(user.uid, user, mission.uid);
  }

  return (
    <Card className={classes.root} {...rest}>
      <CardContent className={classes.cardContent}>
        <Grid container spacing={1} alignItems="flex-start" justify="flex-end" direction="row">
          <Grid item>
            <img height="20" src={appleIcon} alt="" />
          </Grid>
          <Grid item style={{ flex: 1 }} className={classes.title}>
            {title}
          </Grid>
          <Grid item>
            <InfoIcon />
          </Grid>
        </Grid>

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
              <Grid item className={classes.center}>
                <Button size="medium" onClick={acceptMission} className={classes.center}>
                  Accept
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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
