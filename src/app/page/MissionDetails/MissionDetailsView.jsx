import React from "react";
import PropTypes from "prop-types";

import { H5, Body2 } from "../../component";
import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";
import {
  Divider,
  Button,
  Grid,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import { color } from "../../../theme";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import cameraImage from "../../../img/placeholderBackground.svg";

import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { MissionStatus, MissionFundedStatus, Mission } from "../../model";
import { missionStatusLabel } from "../../../constants";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(2),
  },
  goBackIcon: {
    fontSize: 32,
    fill: color.deepPurple,
    "&:hover": {
      cursor: "pointer",
    },
  },
  cardHeader: {
    paddingBottom: theme.spacing(1),
  },
  subheader: {
    marginTop: theme.spacing(0.3),
  },
  contentTypography: {
    paddingLeft: theme.spacing(0.5),
  },
  avatar: {
    height: "25px",
    width: "25px",
    marginBottom: theme.spacing(0.5),
  },
  image: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  missionTypeText: {
    paddingTop: theme.spacing(0.5),
  },
  deliveryDetailsHeader: {
    paddingTop: theme.spacing(1),
    fontWeight: 600,
  },
  deliveryDetails: {
    marginTop: theme.spacing(0.5),
  },
  unassignButton: {
    color: color.darkPink,
    textDecoration: "underline",
  },
}));

const titleCase = (str) => ("" + str).charAt(0).toUpperCase() + ("" + str).substr(1);

const MissionDetailsStatus = ({ status, volunteerName }) => {
  return status === null ? null : status === MissionStatus["unassigned"] ? (
    titleCase(status)
  ) : status === MissionStatus["tentative"] || status === MissionStatus["assigned"] ? (
    volunteerName
  ) : (
    <>
      {volunteerName} - <b>{titleCase(status)}</b>
    </>
  );
};

const MissionDetailsIconList = ({ contentItems, classes, outerClass }) => (
  <Grid container className={outerClass} alignItems="flex-start">
    {contentItems.map((contentItem, index) => {
      const Icon = contentItem.icon;
      const avatarImage = contentItem.avatar?.image;
      const content = contentItem.content.map((content, index) => {
        return (
          <Body2
            key={`content-item-txt-${index + 1}`}
            color="textPrimary"
            style={content.style}
            className={classes.contentTypography}
          >
            {content.text}
          </Body2>
        );
      });

      return (
        <React.Fragment key={`content-item-${index + 1}`}>
          <Grid item xs={1}>
            {Icon !== undefined ? <Icon color="primary" /> : null}
            {avatarImage !== undefined ? (
              <Avatar className={classes.avatar} alt="Volunteer" src={avatarImage} />
            ) : null}
          </Grid>
          <Grid item xs={11}>
            {content}
          </Grid>
        </React.Fragment>
      );
    })}
  </Grid>
);

const MissionDetailsContent = ({ description, classes }) => (
  <Box>
    <H5 align="left" color="textSecondary">
      Mission Type
    </H5>
    <Body2 align="left" className={classes.missionTypeText} color="textPrimary">
      {description}
    </Body2>
  </Box>
);

const MissionDetailsButton = ({
  type,
  volunteerForMission,
  startMission,
  markMissionAsDelivered,
}) => {
  switch (type) {
    case MissionStatus["unassigned"]:
      return (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={volunteerForMission}
        >
          Accept Mission
        </StyledButton>
      );
    case MissionStatus["tentative"]:
    case MissionStatus["assigned"]:
      return (
        <StyledButton color="primary" variant="contained" disableElevation onClick={startMission}>
          Start Mission
        </StyledButton>
      );
    case MissionStatus["started"]:
      return (
        <StyledButton
          color="primary"
          variant="contained"
          disableElevation
          onClick={markMissionAsDelivered}
        >
          Mark Mission as Delivered
        </StyledButton>
      );
    case MissionStatus["delivered"]:
    case MissionStatus["done"]:
      return null;
    default:
      return (
        <StyledButton color="primary" variant="contained" disableElevation>
          Loading..
        </StyledButton>
      );
  }
};

const MissionDetailsPickUpDeliveryHeader = ({ header, classes }) => (
  <Body2 align="left" className={classes.deliveryDetailsHeader} color="textPrimary">
    {header}
  </Body2>
);

const MissionDetailsPage = ({
  mission,
  volunteer,
  volunteerForMission,
  startMission,
  markMissionAsDelivered,
  unassignFromMission,
  userUnverifiedPopupOpen,
  setUserUnverifiedPopupOpen,
  history,
}) => {
  //mock data
  mission = {
    ...mission,
    fundedStatus: MissionFundedStatus["fundedbydonation"],
    status: MissionStatus["unassigned"],
    pickUpWindow: "1:30 PM",
    pickUplocation: "123 Strawberry Ln, VA 22201",
    deliveryWindow: "2:30–3:30 PM",
    deliverylocation: "123 Strawberry Ln, VA 22201",
    recipientName: "John Doe",
    recipientPhoneNumber: "(123) 456-7890",
  };
  volunteer = {
    ...volunteer,
    profileName: "Jane",
    avatar: "https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg",
  };

  const classes = useStyles();
  const title = mission.title || null;
  const status = mission.status || null;
  const fundedStatus = mission.fundedStatus
    ? titleCase(MissionFundedStatus[mission.fundedStatus])
    : null;
  const description = mission.description || null;
  const pickUpLocation = mission.pickUplocation || null;
  const pickUpWindow = mission.pickUpWindow || null;
  const deliveryLocation = mission.deliverylocation || null;
  const deliveryWindow = mission.deliveryWindow || null;
  const recipientName = mission.recipientName || null;
  const recipientPhoneNumber = mission.recipientPhoneNumber || null;

  const subheaderItems = [
    {
      icon: mission.status === MissionStatus["unassigned"] ? PersonIcon : undefined,
      avatar:
        mission.status !== MissionStatus["unassigned"]
          ? {
              image: volunteer.avatar,
            }
          : undefined,
      content: [
        { text: <MissionDetailsStatus status={status} volunteerName={volunteer.profileName} /> },
      ],
    },
    {
      icon: AttachMoneyIcon,
      content: [{ text: fundedStatus }],
    },
  ];

  const pickUpDetails = [
    {
      icon: LocationOnIcon,
      content: [{ text: pickUpLocation }],
    },
    {
      icon: ScheduleIcon,
      content: [{ text: pickUpWindow }],
    },
  ];

  const deliveryDetails = [
    {
      icon: LocationOnIcon,
      content: [{ text: deliveryLocation }],
    },
    {
      icon: ScheduleIcon,
      content: [{ text: deliveryWindow }],
    },
    {
      icon: PersonIcon,
      content: [
        { text: recipientName },
        {
          text: recipientPhoneNumber,
          style: {
            fontWeight: 600,
            textDecoration: "underline",
          },
        },
      ],
    },
  ];

  return (
    <>
      <Grid className={classes.content} direction="column" container>
        <Grid align="left" item>
          <ArrowBackIcon
            align="left"
            className={classes.goBackIcon}
            onClick={() => history.goBack()}
          />
        </Grid>
        <Grid>
          <Card align="left">
            <CardHeader
              title={title}
              titleTypographyProps={{ variant: "h3", component: "span", color: "textPrimary" }}
              subheader={
                <MissionDetailsIconList
                  outerClass={classes.subheader}
                  contentItems={subheaderItems}
                  classes={classes}
                />
              }
              className={classes.cardHeader}
            />
            <CardMedia image={cameraImage} title="Mission image" className={classes.image} />
            <CardContent className={classes.cardContent}>
              <MissionDetailsContent description={description} classes={classes} />
              <MissionDetailsPickUpDeliveryHeader header="Pick Up Details" classes={classes} />
              <MissionDetailsIconList
                outerClass={classes.deliveryDetails}
                contentItems={pickUpDetails}
                classes={classes}
              />
              <MissionDetailsPickUpDeliveryHeader header="Delivery Details" classes={classes} />
              <MissionDetailsIconList
                outerClass={classes.deliveryDetails}
                contentItems={deliveryDetails}
                classes={classes}
              />
            </CardContent>
            <Divider />
            <CardActions>
              <MissionDetailsButton
                type={mission.status}
                volunteerForMission={() => volunteerForMission(mission.id)}
                startMission={() => startMission(mission.id)}
                markMissionAsDelivered={() => markMissionAsDelivered(mission.id)}
              />
            </CardActions>
            <CardActions>
              <Grid container justify="center">
                {mission.status === MissionStatus["tentative"] ||
                mission.status === MissionStatus["assigned"] ? (
                  <Button
                    className={classes.unassignButton}
                    disableElevation
                    onClick={unassignFromMission}
                  >
                    Unassign Me
                  </Button>
                ) : null}
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <UserPhoneUnverifiedPopup
        open={userUnverifiedPopupOpen}
        handleClose={() => setUserUnverifiedPopupOpen(false)}
      />
    </>
  );
};

MissionDetailsPage.propTypes = {
  /**
   * Mission details
   */
  mission: PropTypes.object,
  /**
   * Volunteer details
   */
  volunteer: PropTypes.object,
  /**
   * Handler functions for button
   */
  volunteerForMission: PropTypes.func,
  startMission: PropTypes.func,
  markMissionAsDelivered: PropTypes.func,
  unassignVolunteerFromMission: PropTypes.func,
  /**
   * Popup for unverified user
   */
  userUnverifiedPopupOpen: PropTypes.bool,
  setUserUnverifiedPopupOpen: PropTypes.func,
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

export default MissionDetailsPage;
