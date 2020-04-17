import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../component";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "recompose";

import _ from "../../utils";

import MissionsMapView from "./MissionsMapView";
import MissionsListView from "./MissionsListView";
import MissionDetails from "./MissionDetails";

import { Mission } from "../../model";

import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexWrap: "nowrap",
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

const ViewButtons = ({ missionsView, classes }) => {
  const history = useHistory();
  const ordered = [
    {
      view: "inProposed",
      text: "Proposed",
      onClick: () =>
        history.replace({
          search: _.setQueryParam("view", "inProposed"),
        }),
    },
    {
      view: "inPlanning",
      text: "Planning",
      onClick: () =>
        history.replace({
          search: _.setQueryParam("view", "inPlanning"),
        }),
    },
    {
      view: "inProgress",
      text: "In Progress",
      onClick: () =>
        history.replace({
          search: _.setQueryParam("view", "inProgress"),
        }),
    },
    {
      view: "inDone",
      text: "Done",
      onClick: () =>
        history.replace({
          search: _.setQueryParam("view", "inDone"),
        }),
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

const DashboardMissions = ({ inProposed, inPlanning, inProgress, inDone }) => {
  const classes = useStyles();
  const all = { inProposed, inPlanning, inProgress, inDone };

  const [pageView, setPageView] = useState(pageViews.list);
  let filtered = inProposed;

  const viewFromUrl = _.getQueryParam("view");
  filtered = all[viewFromUrl];

  let selectedMissionId = _.getQueryParam("missionId");

  return (
    <Grid container className={classes.root}>
      <Grid container item lg sm direction="column" className={classes.root}>
        <Grid item container spacing={2} className={classes.viewButtons}>
          <ViewButtons missionsView={viewFromUrl} classes={classes} />
          <Grid item xs={3}>
            <PageButtons pageView={pageView} setPageView={setPageView} classes={classes} />
          </Grid>
        </Grid>
        <Grid item container className={classes.main} xs>
          {pageView === pageViews.map ? (
            <MissionsMapView missions={filtered} />
          ) : (
            <MissionsListView missions={filtered} view={viewFromUrl} />
          )}
        </Grid>
      </Grid>
      {selectedMissionId && <MissionDetails missionId={selectedMissionId} />}
    </Grid>
  );
};

const mapStateToProps = (state, ownProps) => {
  let inProposed = Mission.selectInProposed(state);
  let inPlanning = Mission.selectInPlanning(state);
  let inProgress = Mission.selectInProgress(state);
  let inDone = Mission.selectInDone(state);

  return {
    user: state.firebase.auth,
    inProposed,
    inPlanning,
    inProgress,
    inDone,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(() => {
    //TODO: connect when we need it
    return [Mission.fsInProposed, Mission.fsInPlanning, Mission.fsInProgress, Mission.fsInDone];
  })
)(DashboardMissions);
