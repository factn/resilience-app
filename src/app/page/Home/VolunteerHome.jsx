import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import User from "../../model/User";
import {
  getAllPlanningMissionss,
  getAllCompletedMissions,
  getAllInProgressMissions,
  getAllProposedMissions,
} from "./missionHelpers";
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";

const theme = createMuiTheme({
  overrides: {
    MuiTab: {
      root: {
        "&.PrivateTabIndicator-colorSecondary": {
          backgroundColor: "#373985",
        },
        "&.MuiTab-root": {
          textTransform: "none",
          backgroundColor: "black",
          border: 0,
          borderBottom: "2px solid",
          "&:hover": {
            border: 0,
            borderBottom: "2px solid",
          },
        },
        "&.Mui-selected": {
          backgroundColor: "none",
          borderBottom: "2px solid #373985",
          borderColor: "#373985",
        },
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    color: "#3739B5",
    backgroundColor: "white",
  },
}));

export default function VolunteerHome({ currentUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [inPlanningMissions, updateInPlanningMissions] = useState([]);
  const [inProgressMissions, updateInProgressMissions] = useState([]);
  const [proposedMissions, updateProposedMissions] = useState([]);
  const [completedMissions, updateCompletedMissions] = useState([]);

  useEffect(() => {
    const fetchAllAssociatedMissions = async () => {
      const missions = await User.getAllAssociatedMissions(currentUser.uid);

      updateInPlanningMissions(getAllPlanningMissionss(missions, currentUser));
      updateInProgressMissions(getAllInProgressMissions(missions, currentUser));
      updateProposedMissions(getAllProposedMissions(missions, currentUser));
      updateCompletedMissions(getAllCompletedMissions(missions, currentUser));
    };

    fetchAllAssociatedMissions();
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartMissionFromAssigned = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = inPlanningMissions.filter((m) => m.id === missionId);
    updateInProgressMissions(inProgressMissions.concat(mission));
    updateInPlanningMissions(inPlanningMissions.filter((m) => m.id !== missionId));
  };

  const handleStartMissionFromSuggested = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = proposedMissions.filter((m) => m.id === missionId);
    updateInProgressMissions(inProgressMissions.concat(mission));
    updateProposedMissions(proposedMissions.filter((m) => m.id !== missionId));
  };

  const handleDeliveringMissionsFromStarted = (missionId) => {
    User.deliverMission(currentUser.uid, missionId);
    const mission = inProgressMissions.filter((m) => m.id === missionId);

    updateCompletedMissions(completedMissions.concat(mission));

    updateInProgressMissions(inProgressMissions.filter((m) => m.id !== missionId));
  };

  const proposedLabel = "Proposed (" + proposedMissions.length + ")";
  const planningLabel = "Planning (" + inPlanningMissions.length + ")";
  const inProgressLabel = "In Progress (" + inProgressMissions.length + ")";
  const completedLabel = "Completed (" + completedMissions.length + ")";

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Tabs
            TabIndicatorProps={{ style: { background: "#373985" } }}
            classes={classes}
            value={value}
            variant="fullWidth"
            centered
            onChange={handleChange}
            aria-label="volunteer dashboard tabs"
          >
            <Tab label={proposedLabel} {...a11yProps(2)} />
            <Tab label={planningLabel} {...a11yProps(1)} />
            <Tab label={inProgressLabel} {...a11yProps(0)} />
            <Tab label={completedLabel} {...a11yProps(3)} />
          </Tabs>
        </AppBar>
      </ThemeProvider>
      <TabPanel value={value} index={0}>
        <VolunteerHomeMissionList
          missions={inProgressMissions}
          currentUser={currentUser}
          actionText={"Mission Delivered"}
          action={(missionId) => handleDeliveringMissionsFromStarted(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VolunteerHomeMissionList
          missions={inPlanningMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromAssigned(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VolunteerHomeMissionList
          missions={proposedMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromSuggested(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <VolunteerHomeMissionList missions={completedMissions} currentUser={currentUser} />
      </TabPanel>
    </div>
  );
}

function TabPanel(props) {
  const { children, index, value, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
