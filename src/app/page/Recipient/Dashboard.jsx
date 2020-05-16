import React, { useEffect, useState } from "react";
import { Typography, Box, Button, makeStyles, Tabs, Tab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Link, useLocation, Redirect, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { Page } from "../../layout";
import { routes, AppRoute } from "../../routing";
import { User } from "../../model";
import { MissionStatus } from "../../model/schema";
import RequestsList from "./RequestsList";

const useStyles = makeStyles((theme) => ({
  requestButton: {
    width: "fit-content",
    borderRadius: "2rem",
    position: "fixed",
    bottom: "0",
    right: "0",
    margin: "0 1rem 1rem 0",
  },
  tab: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
  tabs: {
    width: "inherit",
  },
}));

const stepMap = (path) =>
  ({
    [routes.recipient.dashboard.submitted]: 0,
    [routes.recipient.dashboard.completed]: 1,
  }[path] || 0);

const completedStatus = [MissionStatus.delivered, MissionStatus.succeeded];

export default function () {
  const classes = useStyles();
  const location = useLocation();
  const auth = useSelector((state) => state.firebase.auth);
  const [missions, setMissions] = useState({ submitted: [], completed: [] });

  useEffect(() => {
    User.getAllRequestedMissions(auth.uid).then((missions) => {
      let submitted = [];
      let completed = [];

      missions.forEach((mission) => {
        completedStatus.includes(mission.status)
          ? completed.push(mission)
          : submitted.push(mission);
      });

      setMissions({ submitted, completed });
    });
  }, [auth.uid]);

  if (location.pathname === routes.recipient.dashboard.home) {
    return <Redirect to={routes.recipient.dashboard.submitted} />;
  }

  return (
    <Page
      appbar={
        <Typography variant="h1" color="textPrimary">
          Requests
        </Typography>
      }
    >
      <Tabs
        variant="fullWidth"
        className={classes.tabs}
        indicatorColor="primary"
        value={stepMap(location.pathname)}
      >
        <Tab
          label={
            <Link to={routes.recipient.dashboard.submitted} className={classes.tab}>
              submitted ({missions.submitted.length})
            </Link>
          }
        ></Tab>
        <Tab
          label={
            <Link to={routes.recipient.dashboard.completed} className={classes.tab}>
              completed ({missions.completed.length})
            </Link>
          }
        ></Tab>
      </Tabs>
      <Box margin="0 1rem" height="100%">
        <Switch>
          <AppRoute path={routes.recipient.dashboard.submitted}>
            <RequestsList missions={missions.submitted} />
          </AppRoute>
          <AppRoute path={routes.recipient.dashboard.completed}>
            <RequestsList missions={missions.completed} />
          </AppRoute>
        </Switch>
      </Box>
      <Button
        className={classes.requestButton}
        size="large"
        variant="contained"
        color="primary"
        startIcon={<Add />}
        component={Link}
        to={routes.request.start}
      >
        NEW REQUEST
      </Button>
    </Page>
  );
}
