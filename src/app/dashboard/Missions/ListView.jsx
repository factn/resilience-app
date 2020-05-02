import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";

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
}));

const Views = {
  list: "missions-list-view",
  details: "single-details-view",
  group: "missions-group-view",
};

function score(mission) {
  if (!mission?.status) return 0;

  // yepp, 3 mission.
  switch (mission.status) {
    case Mission.Status.unassigned:
      return 0;
    case Mission.Status.tentative:
      if (mission.tentativeVolunteerId) {
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
  users,
}) => {
  const classes = useStyles();
  const [view, setView] = useState(Views.list);

  const { groups, singleMissions } = Mission.getAllGroups(missions);
  const sortedMissions = singleMissions.sort(sortAlgo);

  useEffect(() => {
    if (view !== Views.list) {
      setView(Views.list);
    }
    // eslint-disable-next-line
  }, [missionsView]);

  function toDetailsView() {
    setView(Views.details);
  }

  function toList(missions) {
    if (!missions) return null;
    return (
      <Grid direction="column">
        {missions.map((mission) => (
          <ListItem
            key={mission.id}
            mission={mission}
            users={users}
            selectedMission={selectedMission}
            setSelectedMission={setSelectedMission}
            toDetailsView={toDetailsView}
            groups={groups}
          />
        ))}
      </Grid>
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
      <Grid hidden={view !== Views.list} direction="column">
        {groups?.map((group) => {
          const color = _.randomColor(group.groupDisplayName);
          return (
            <MuiExpansionPanel key={group.id}>
              <MuiExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                id={`group-${group.id}-header`}
                aria-controls={`group-${group.id}-content`}
              >
                <Grid container className={classes.group}>
                  <GroupWorkIcon style={{ color: color }} />({group.missions.length}){" "}
                  {group.groupDisplayName}
                </Grid>
              </MuiExpansionPanelSummary>
              <MuiExpansionPanelDetails>{toList(group.missions)}</MuiExpansionPanelDetails>
            </MuiExpansionPanel>
          );
        })}
        <MuiExpansionPanel>
          <MuiExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="group-single-header"
            aria-controls="group-single-content"
          >
            <Grid container className={classes.group}>
              ({sortedMissions.length}) Single Missions
            </Grid>
          </MuiExpansionPanelSummary>
          <MuiExpansionPanelDetails>{toList(sortedMissions)}</MuiExpansionPanelDetails>
        </MuiExpansionPanel>
      </Grid>
    </Paper>
  );
};

export default MissionsListView;
