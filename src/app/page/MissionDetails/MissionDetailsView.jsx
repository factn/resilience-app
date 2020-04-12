import React from "react";

import { Button, H3, H5, Body2 } from "../../component";
import { Typography, Grid, Box, Avatar } from "@material-ui/core";
import { Card } from "../../layout";
import { color } from "../../../theme";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ScheduleIcon from "@material-ui/icons/Schedule";
import cameraImage from "../../../img/placeholderBackground.svg";

import { makeStyles } from "@material-ui/core/styles";

// Created based on the schema in firebase
import styled from "styled-components";

import MapView from "../../component/MapView";
import UserPhoneUnverifiedPopup from "../../component/UserPhoneUnverifiedPopup";
import { missionStatusLabel } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  content: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(8),
  },
  textContainer: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  unassignedText: {
    fontWeight: 600,
    letterSpacing: "0.2px",
    color: color.darkPink,
  },
  inProgressText: {
    fontWeight: 600,
    letterSpacing: "0.2px",
    color: color.darkOrange,
  },
  volunteerIcon: {
    marginTop: theme.spacing(0.25),
    fontSize: 20,
  },
  volunteerText: {
    marginTop: theme.spacing(0.15),
    marginLeft: theme.spacing(0.2),
  },
  avatar: {
    marginTop: theme.spacing(0.25),
    height: "25px",
    width: "25px",
  },
  avatarText: {
    marginTop: theme.spacing(0.4),
    marginLeft: theme.spacing(0.5),
  },
  imageContainer: {
    marginTop: theme.spacing(1),
    padding: 0,
  },
  image: {
    width: "100%",
    height: "auto",
  },
  missionTypeText: {
    marginTop: theme.spacing(0.4),
    fontWeight: 500,
  },
  detailsHeader: {
    fontWeight: 600,
  },
  detailsIcon: {
    marginTop: theme.spacing(0.2),
    marginRight: theme.spacing(1),
  },
  detailsText: {
    marginTop: theme.spacing(0.2),
  },
  divider: {
    border: "solid 1px #D4D5D9",
  },
}));

const MissionDetailsPage = ({
  mission,
  volunteers,
  volunteerForMission,
  markMissionAsCompleted,
  userUnverifiedPopupOpen,
  setUserUnverifiedPopupOpen,
  cords,
  history,
}) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.content}>
        <Card className={classes.textContainer}>
          <H3 align="left" color="textPrimary">
            Mission Title - Lorem ipsu
          </H3>
          {mission.status === "todo" ? (
            <>
              <Body2 align="left" className={classes.unassignedText}>
                &bull; UNASSIGNED
              </Body2>
              <Grid container>
                <Grid item>
                  <PersonIcon
                    className={classes.volunteerIcon}
                    style={{ fill: color.vibrantPurple }}
                  />
                </Grid>
                <Grid item>
                  <Body2 align="left" color="textPrimary" className={classes.volunteerText}>
                    Looking for volunteer
                  </Body2>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Body2 align="left" className={classes.inProgressText}>
                &bull; IN PROGRESS
              </Body2>
              <Grid container>
                <Grid item>
                  <Avatar
                    className={classes.avatar}
                    alt="Volunteer"
                    src="https://qodebrisbane.com/wp-content/uploads/2019/07/This-is-not-a-person-2-1.jpeg"
                  />
                </Grid>
                <Grid item>
                  <Body2 align="left" color="textPrimary" className={classes.avatarText}>
                    {volunteers[0].displayName}
                  </Body2>
                </Grid>
              </Grid>
            </>
          )}
        </Card>
        <Card className={classes.imageContainer}>
          <img src={cameraImage} alt="Mission" className={classes.image} />
        </Card>
        <Card className={classes.textContainer}>
          <H5 align="left" color="textSecondary">
            Mission Type
          </H5>
          <Body2 align="left" className={classes.missionTypeText} color="textPrimary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus cursus nibh quis erat
            condimentum, vitae porttitor neque tempus.
          </Body2>
        </Card>
        <Card className={classes.textContainer}>
          <Body2 align="left" className={classes.detailsHeader} color="textPrimary">
            Pick up Details
          </Body2>
          <Grid container>
            <Grid item>
              <LocationOnIcon
                className={classes.detailsIcon}
                style={{ fill: color.vibrantPurple }}
              />
            </Grid>
            <Grid item>
              <Body2 align="left" color="textPrimary" className={classes.detailsText}>
                123 Strawberry Ln, VA 22201
              </Body2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <ScheduleIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
            </Grid>
            <Grid item>
              <Body2 align="left" color="textPrimary" className={classes.detailsText}>
                1:30 PM
              </Body2>
            </Grid>
          </Grid>
        </Card>
        <Card className={classes.textContainer}>
          <Body2 align="left" className={classes.detailsHeader} color="textPrimary">
            Delivery Details
          </Body2>
          <Grid container>
            <Grid item>
              <LocationOnIcon
                className={classes.detailsIcon}
                style={{ fill: color.vibrantPurple }}
              />
            </Grid>
            <Grid item>
              <Body2 align="left" color="textPrimary" className={classes.detailsText}>
                123 Strawberry Ln, VA 22201
              </Body2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <ScheduleIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
            </Grid>
            <Grid item>
              <Body2 align="left" color="textPrimary" className={classes.detailsText}>
                2:30 PM
              </Body2>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <PersonIcon className={classes.detailsIcon} style={{ fill: color.vibrantPurple }} />
            </Grid>
            <Grid item>
              <Body2 align="left" color="textPrimary" className={classes.detailsText}>
                John Doe
              </Body2>
            </Grid>
          </Grid>
        </Card>
        <hr className={classes.divider} />
        <Card>
          <Grid>
            {mission.status === "todo" ? (
              <Button text="Accept Mission" onClick={() => volunteerForMission(mission.id)} />
            ) : (
              <Button text="Mark Mission as Completed" onClick={markMissionAsCompleted} />
            )}
          </Grid>

          <Typography variant="body1">{mission.details}</Typography>
        </Card>
      </Box>
      <UserPhoneUnverifiedPopup
        open={userUnverifiedPopupOpen}
        handleClose={() => setUserUnverifiedPopupOpen(false)}
      />
    </>
  );
};
export default MissionDetailsPage;
