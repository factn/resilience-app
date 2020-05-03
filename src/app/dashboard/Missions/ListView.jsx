import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import PanToolIcon from "@material-ui/icons/PanTool";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import clsx from "clsx";
import DetailsView from "./DetailsView";
import ListItem from "./ListItem";
import { Mission } from "../../model";
import _ from "../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    width: "400px",
  },
  group: {
    maxWidth: "380px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: "16px",
    fontWeight: "bold",
    color: "black",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
    },
  },
  readyToStart: {
    color: "lightgrey",
  },

  containSelected: {
    border: "2px solid green !important",
  },
  expansion: {
    border: "2px solid transparent",
  },
  isReady: {
    color: "green",
  },
}));

const Views = {
  list: "missions-list-view",
  details: "single-details-view",
  group: "missions-group-view",
};

function score(mission) {
  if (!mission?.status) return 0;

  switch (mission.status) {
    case Mission.Status.unassigned:
      return 0;
    case Mission.Status.tentative:
      if (mission.tentativeVolunteerUid) {
        return 2;
      }
      return 1;
    case Mission.Status.assigned:
      return 3;
    case Mission.Status.started:
      return 4;
    case Mission.Status.delivered:
      return 5;
    case Mission.Status.failed:
      return 6;
    case Mission.Status.succeeded:
      return 7;
    default:
      return 0;
  }
}
function sortAlgo(a, b) {
  return score(a) - score(b);
}

const MissionsListView = ({
  currentMission,
  missions,
  missionsView,
  selectedMission,
  setSelectedMission,
  volunteers,
}) => {
  const classes = useStyles();
  const [view, setView] = useState(Views.list);

  const { groups, singleMissions } = Mission.getAllGroups(missions);
  const sortedMissions = {
    groupUid: "",
    groupDisplayName: "Single Missions",
    missions: singleMissions.sort(sortAlgo),
  };
  groups.push(sortedMissions);

  useEffect(() => {
    if (view !== Views.list) {
      setView(Views.list);
    }
    // eslint-disable-next-line
  }, [missionsView]);

  function toDetailsView() {
    setView(Views.details);
  }

  function toList(group) {
    if (!group?.missions) return null;
    const color = _.randomColor(group.groupDisplayName);

    let totReady = 0;
    let containSelected = false;
    let totTentative = 0;
    let totAssigned = 0;

    group.missions.forEach((mission) => {
      if (mission.readyToStart) totReady += 1;
      if (mission.uid === selectedMission) containSelected = true;
      if (mission.tentativeVolunteerUid) totTentative += 1;
      if (mission.volunteerUid) totAssigned += 1;
    });

    let totUnassigned = group.missions?.length - totTentative - totAssigned;
    const isReady = totReady === group.missions?.length;
    // depends on the design later
    return (
      <MuiExpansionPanel
        key={group.groupUid}
        className={clsx({ [classes.containSelected]: containSelected }, classes.expansion)}
      >
        <MuiExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          id={`group-${group.id}-header`}
          aria-controls={`group-${group.id}-content`}
        >
          <Grid container className={classes.group}>
            <Grid container item>
              {group.groupUid && <GroupWorkIcon style={{ color: color }} />}
              {group.groupDisplayName}
            </Grid>
            <Grid container item>
              <CheckCircleOutlineIcon
                className={clsx(classes.readyToStart, { [classes.isReady]: isReady })}
              />
              {totReady}/{group.missions.length} missions ready
            </Grid>
            <Grid container item>
              <PanToolIcon style={{ color: "lightgrey" }} />
              {totUnassigned}

              <PanToolIcon style={{ color: "#fbb03b" }} />
              {totTentative}
              <PanToolIcon color="primary" />
              {totAssigned}
            </Grid>
          </Grid>
        </MuiExpansionPanelSummary>
        <MuiExpansionPanelDetails>
          <Grid container direction="column">
            {group.missions.map((mission) => (
              <ListItem
                key={mission.uid}
                mission={mission}
                volunteers={volunteers}
                selectedMission={selectedMission}
                setSelectedMission={setSelectedMission}
                toDetailsView={toDetailsView}
                groups={groups}
              />
            ))}
          </Grid>
        </MuiExpansionPanelDetails>
      </MuiExpansionPanel>
    );
  }

  return (
    <Paper className={classes.root}>
      <Box hidden={view !== Views.details}>
        <DetailsView
          mission={currentMission}
          setSelectedMission={setSelectedMission}
          toListView={() => setView(Views.list)}
        />
      </Box>
      <Box hidden={view !== Views.list}>
        <Grid container direction="column">
          {groups?.map(toList)}
        </Grid>
      </Box>
    </Paper>
  );
};

export default MissionsListView;
