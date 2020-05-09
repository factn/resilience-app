import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import Divider from "@material-ui/core/Divider";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";

import DetailsView from "./DetailsView";
import ListItem from "./ListItem";
import { Mission } from "../../model";
import _ from "../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
  },
  expansionSummary: {
    backgroundColor: theme.color.black,
    color: theme.color.white,
    textAlign: "left",
    padding: `0 ${theme.spacing(2)}px`,
    width: "100%",
    "& svg": {
      margin: `0 ${theme.spacing(1)}px`,
    },
    "& > div": {
      width: "100%",
    },
  },
  expansionHeader: {
    ...theme.typography.h4,
    color: theme.color.white,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  readyToStart: {
    color: "lightgrey",
  },

  isReady: {
    color: "green",
  },
  expansion: {
    width: "100%",
  },
  expansionPanelDetails: {
    padding: theme.spacing(1),
    background: "whitesmoke",
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

    /**
     * Will be add another icon later, remove this for now
     */
    return (
      <Card key={group.groupUid} className={classes.expansion} elevation={0}>
        <MuiExpansionPanel defaultExpanded={true}>
          <MuiExpansionPanelSummary
            id={`group-${group.groupUid}-header`}
            aria-controls={`group-${group.groupUid}-content`}
            className={classes.expansionSummary}
          >
            <Grid container wrap="nowrap">
              <Grid item className={classes.expansionHeader} xs>
                {group.groupDisplayName}
              </Grid>
              <Grid item>{group.groupUid && <GroupWorkIcon style={{ color: color }} />}</Grid>
            </Grid>
          </MuiExpansionPanelSummary>
          <MuiExpansionPanelDetails className={classes.expansionPanelDetails}>
            <Grid container direction="column">
              {group.missions.map((mission) => (
                <ListItem
                  key={mission.uid}
                  mission={mission}
                  volunteers={volunteers}
                  selectedMission={selectedMission}
                  setSelectedMission={setSelectedMission}
                  missionsView={missionsView}
                  toDetailsView={toDetailsView}
                  groups={groups}
                />
              ))}
            </Grid>
          </MuiExpansionPanelDetails>
        </MuiExpansionPanel>
        <Divider />
      </Card>
    );
  }

  return (
    <Paper className={classes.root}>
      <Box hidden={view !== Views.details} width="100%">
        <DetailsView
          mission={currentMission}
          setSelectedMission={setSelectedMission}
          toListView={() => setView(Views.list)}
        />
      </Box>
      <Box hidden={view !== Views.list} width="100%">
        <Grid container direction="column">
          {groups?.map(toList)}
        </Grid>
      </Box>
    </Paper>
  );
};

export default MissionsListView;
