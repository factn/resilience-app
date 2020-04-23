import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import MapIcon from "@material-ui/icons/Map";
import ListIcon from "@material-ui/icons/List";
import Box from "@material-ui/core/Box";

import _ from "../../utils";
import { Button } from "../../component";
import { Mission } from "../../model";
import MapView from "./MapView";
import ListView from "./ListView";
import DetailsView from "./DetailsView";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    flexWrap: "nowrap",
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

const DashboardMissions = ({ inDone, inPlanning, inProgress, inProposed }) => {
  const classes = useStyles();

  const viewFromUrl = _.getQueryParam("view");

  const [detailsMission, setDetailsMission] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);

  const all = { inProposed, inPlanning, inProgress, inDone };
  const filtered = all[viewFromUrl] || inProposed;

  let mission = filtered.find((m) => m.id === detailsMission);
  useEffect(() => {
    setDetailsMission(null);
  }, [filtered]);
  return (
    <Grid container className={classes.root}>
      <Grid container item lg sm direction="column" className={classes.root}>
        <Grid item container spacing={2} className={classes.viewButtons}>
          <ViewButtons missionsView={viewFromUrl} classes={classes} />
        </Grid>
        <Grid item container></Grid>
        <Grid item container className={classes.main} xs>
          <Box width="400px">
            {mission ? (
              <DetailsView
                mission={mission}
                setSelectedMission={setSelectedMission}
                setDetailsMission={setDetailsMission}
              />
            ) : (
              <ListView
                missions={filtered}
                view={viewFromUrl}
                selectedMission={selectedMission}
                setDetailsMission={setDetailsMission}
                setSelectedMission={setSelectedMission}
              />
            )}
          </Box>
          <Grid item xs>
            <MapView missions={filtered} selectedMission={selectedMission} />
          </Grid>
        </Grid>
      </Grid>
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

export default connect(mapStateToProps)(DashboardMissions);
