<<<<<<< HEAD
import { AppBar, Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
=======
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
>>>>>>> ba3f049aefe3f3a7f7fac802b9aa46e0b3a3184b
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import User from "../../model/User";
<<<<<<< HEAD
import {
  getAllAssignedMissions,
  getAllStartedMissions,
  getAllAvailableMissions,
} from "./missionHelpers";
=======
import { getAllAssignedMissions, getAllStartedMissions } from "./missionHelpers";
>>>>>>> ba3f049aefe3f3a7f7fac802b9aa46e0b3a3184b
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabMargin: {
    margin: "1rem 0",
  },
}));

export default function VolunteerHome({ currentUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [acceptedMissions, updateAssignedMissions] = useState([]);
  const [startedMissions, updateStartedMissions] = useState([]);
  const [availableMissions, updateAvailableMissions] = useState([]);

  useEffect(() => {
    const fetchAllAssociatedMissions = async () => {
      const missions = await User.getAllAssociatedMissions(currentUser.uid);
      const availableMissions = await User.getAllAvailableMissions(currentUser.uid);

      updateAvailableMissions(availableMissions);
      updateAssignedMissions(getAllAssignedMissions(missions, currentUser));
      updateStartedMissions(getAllStartedMissions(missions, currentUser));
<<<<<<< HEAD
      updateAvailableMissions(getAllAvailableMissions(missions, currentUser));
=======
>>>>>>> ba3f049aefe3f3a7f7fac802b9aa46e0b3a3184b
    };

    fetchAllAssociatedMissions();
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartMissionFromAssigned = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = acceptedMissions.filter((m) => m.id === missionId);
    updateStartedMissions(startedMissions.concat(mission));
    updateAssignedMissions(acceptedMissions.filter((m) => m.id !== missionId));
  };

  const handleStartMissionFromAvailable = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = availableMissions.filter((m) => m.id === missionId);
    updateStartedMissions(startedMissions.concat(mission));
    updateAvailableMissions(availableMissions.filter((m) => m.id !== missionId));
  };

  const handleDeliveringMissionsFromStarted = (missionId) => {
    User.deliverMission(currentUser.uid, missionId);
<<<<<<< HEAD
    const mission = startedMissions.filter((m) => m.id === missionId);

    updateStartedMissions(startedMissions.filter((m) => m.id !== missionId));
  };

  const availableLabel = "Available (" + availableMissions.length + ")";
  const acceptedLabel = "Accepted (" + acceptedMissions.length + ")";
  const startedLabel = "Started (" + startedMissions.length + ")";

=======
    updateStartedMissions(startedMissions.filter((m) => m.id !== missionId));
  };

  const availableLabel = "Available (" + availableMissions.length + ")";
  const acceptedLabel = "Accepted (" + acceptedMissions.length + ")";
  const startedLabel = "Started (" + startedMissions.length + ")";

>>>>>>> ba3f049aefe3f3a7f7fac802b9aa46e0b3a3184b
  return (
    <div className={classes.root}>
      <Paper className={classes.tabMargin} elevation={3} square>
        <Tabs
          value={value}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          centered
          onChange={handleChange}
          aria-label="volunteer dashboard tabs"
        >
          <Tab label={availableLabel} {...a11yProps(2)} />
          <Tab label={acceptedLabel} {...a11yProps(1)} />
          <Tab label={startedLabel} {...a11yProps(0)} />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <VolunteerHomeMissionList
          missions={availableMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromAvailable(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VolunteerHomeMissionList
          missions={acceptedMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromAssigned(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VolunteerHomeMissionList
          missions={startedMissions}
          currentUser={currentUser}
          actionText={"Mission Delivered"}
          action={(missionId) => handleDeliveringMissionsFromStarted(missionId)}
        />
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
