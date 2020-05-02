import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";

import { Button } from "../../component";
import { Mission } from "../../model";
import _ from "../../utils";
import ListView from "./ListView";
import MapView from "./MapView";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexWrap: "nowrap",
  },
  main: {
    overflow: "hidden",
  },
  side: {
    overflow: "hidden",
    height: "100%",
  },

  viewButtons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    width: "70%",
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

const ViewButtons = ({ classes, missionsView }) => {
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

const DashboardMissions = ({ inDone, inPlanning, inProgress, inProposed, users }) => {
  const classes = useStyles();

  const viewFromUrl = _.getQueryParam("view");

  const [selectedMission, setSelectedMission] = useState(null);

  const all = { inProposed, inPlanning, inProgress, inDone };
  const filtered = all[viewFromUrl] || inProposed;

  let currentMission = filtered.find((m) => m.id === selectedMission);
  return (
    <>
      <Grid item container spacing={2} className={classes.viewButtons}>
        <ViewButtons missionsView={viewFromUrl} classes={classes} />
      </Grid>
      <Grid item container className={classes.main} xs>
        <Grid item column className={classes.side}>
          <ListView
            missions={filtered}
            users={users}
            currentMission={currentMission}
            setSelectedMission={setSelectedMission}
            selectedMission={selectedMission}
            missionsView={viewFromUrl}
          />
        </Grid>
        <Grid item xs className={classes.side}>
          <MapView
            missions={filtered}
            currentMission={currentMission}
            setSelectedMission={setSelectedMission}
          />
        </Grid>
      </Grid>
    </>
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

export default connect(mapStateToProps)(DashboardMissions);
