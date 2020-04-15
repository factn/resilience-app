import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../component";
import { connect } from "react-redux";
import { MissionStatus, MissionFundedStatus } from "../../model/schema";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "recompose";

import _ from "lodash";

import MissionsMapView from "./MissionsMapView";
import MissionsListView from "./MissionsListView";

import { Mission } from "../../model";

import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  main: {
    paddingRight: theme.spacing(1),
    flexGrow: 1,
    width: "100%",
  },
  viewButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  outlined: {
    border: 0,
    borderBottom: "2px solid",
    "&:hover": {
      border: 0,
      borderBottom: "2px solid",
    },
  },
  leftButton: {
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  rightButton: {
    borderTopLeftRadius: "0px",
    borderBottomLeftRadius: "0px",
  },
}));

const missionsViews = {
  proposed: {
    id: "proposed",
    filters: [(missions) => _.filter(missions, (m) => m.status === MissionStatus.unassigned)],
  },

  planning: {
    id: "planning",
    filters: [
      (missions) => _.filter(missions, (m) => m.status === MissionStatus.tentative),
      (missions) =>
        _.filter(missions, (m) => {
          return m.status === MissionStatus.assigned && m.deliveryWindow !== {};
        }),
    ],
  },
  inProgress: {
    id: "inProgress",
    filters: [
      (missions) =>
        _.filter(missions, (m) => {
          return m.status === MissionStatus.started;
        }),
      (missions) =>
        _.filter(missions, (m) => {
          return m.status === MissionStatus.delivered;
        }),
    ],
  },
  troubleShooting: {
    id: "troubleShooting",
    filters: [
      (missions) =>
        _.filter(missions, (m) => {
          return m.status === MissionStatus.done;
        }),
    ],
  },
};

const ViewButtons = ({ missionsView, setMissionsView, classes }) => {
  const ordered = [
    {
      view: missionsViews.proposed.id,
      text: "Proposed",
      onClick: () => setMissionsView(missionsViews.proposed.id),
    },
    {
      view: missionsViews.planning.id,
      text: "Planning",
      onClick: () => setMissionsView(missionsViews.planning.id),
    },
    {
      view: missionsViews.inProgress.id,
      text: "In Progress",
      onClick: () => setMissionsView(missionsViews.inProgress.id),
    },
    {
      view: missionsViews.troubleShooting.id,
      text: "Troubleshooting",
      onClick: () => setMissionsView(missionsViews.troubleShooting.id),
    },
  ];

  return (
    <>
      {ordered.map((conf) => (
        <Grid item xs key={conf.view}>
          <Button
            variant={missionsView === conf.view ? "outlined" : "text"}
            fullWidth={true}
            onClick={conf.onClick}
            classes={{ outlined: classes.outlined }}
            aria-label={conf.text}
          >
            {conf.text}
          </Button>
        </Grid>
      ))}
    </>
  );
};

const pageViews = {
  map: "map",
  list: "list",
};
const PageButtons = ({ pageView, setPageView, classes }) => {
  return (
    <>
      <Button
        variant={pageView === pageViews.map ? "contained" : "outlined"}
        onClick={() => setPageView(pageViews.map)}
        classes={{ root: classes.leftButton }}
        aria-label="map"
      >
        <MapIcon />
      </Button>
      <Button
        variant={pageView === pageViews.list ? "contained" : "outlined"}
        onClick={() => setPageView(pageViews.list)}
        classes={{ root: classes.rightButton }}
        aria-label="list"
      >
        <ListIcon />
      </Button>
    </>
  );
};

const Overview = ({ missions, ...rest }) => {
  const classes = useStyles();
  const [missionsView, setMissionsView] = useState(missionsViews.proposed.id);
  const [pageView, setPageView] = useState(pageViews.list);

  let filtered = [];
  missionsViews[missionsView].filters.forEach((filter) => {
    filtered = [...filter(missions), ...filtered];
  });

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item container spacing={2} className={classes.viewButtons}>
        <ViewButtons
          missionsView={missionsView}
          setMissionsView={setMissionsView}
          classes={classes}
        />
        <Grid item xs={3}>
          <PageButtons pageView={pageView} setPageView={setPageView} classes={classes} />
        </Grid>
      </Grid>
      <Grid item container className={classes.main}>
        {pageView === pageViews.map ? (
          <MissionsMapView missions={filtered} />
        ) : (
          <MissionsListView missions={filtered} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.firebase.auth,
    missions: state.firestore.data.missions,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
    return [{ collection: "missions" }];
  })
)(Overview);
