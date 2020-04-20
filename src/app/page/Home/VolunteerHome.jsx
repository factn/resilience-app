import { AppBar, Box, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import User from "../../model/User";
import {
  getAllAssignedMissions,
  getAllCompletedMissions,
  getAllStartedMissions,
  getAllSuggestedMissions,
} from "./missionHelpers";
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function VolunteerHome({ currentUser }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [assignedMissions, updateAssignedMissions] = useState([]);
  const [startedMisssions, updateStartedMissions] = useState([]);
  const [suggestedMissions, updateSuggestedMissions] = useState([]);
  const [completedMisssions, updateCompletedMissions] = useState([]);

  const fetchAllAssociatedMissions = async () => {
    const missions = await User.getAllAssociatedMissions(currentUser.uid);

    updateAssignedMissions(getAllAssignedMissions(missions, currentUser));
    updateStartedMissions(getAllStartedMissions(missions, currentUser));
    updateSuggestedMissions(getAllSuggestedMissions(missions, currentUser));
    updateCompletedMissions(getAllCompletedMissions(missions, currentUser));
  };

  useEffect(() => {
    fetchAllAssociatedMissions();
  }, [fetchAllAssociatedMissions]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartMissionFromAssigned = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = assignedMissions.filter((m) => m.id === missionId);
    updateStartedMissions(startedMisssions.concat(mission));
    updateAssignedMissions(assignedMissions.filter((m) => m.id !== missionId));
  };

  const handleStartMissionFromSuggested = (missionId) => {
    User.startMission(currentUser.uid, missionId);
    const mission = suggestedMissions.filter((m) => m.id === missionId);
    updateStartedMissions(startedMisssions.concat(mission));
    updateSuggestedMissions(suggestedMissions.filter((m) => m.id !== missionId));
  };

  const handleDeliveringMissionsFromStarted = (missionId) => {
    User.deliverMission(currentUser.uid, missionId);
    const mission = startedMisssions.filter((m) => m.id === missionId);

    updateCompletedMissions(completedMisssions.concat(mission));

    updateStartedMissions(startedMisssions.filter((m) => m.id !== missionId));
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          value={value}
          variant="fullWidth"
          centered
          onChange={handleChange}
          aria-label="volunteer dashboard tabs"
        >
          <Tab label="Started" {...a11yProps(0)} />
          <Tab label="Assigned" {...a11yProps(1)} />
          <Tab label="Suggested" {...a11yProps(2)} />
          <Tab label="Completed" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <VolunteerHomeMissionList
          missions={startedMisssions}
          currentUser={currentUser}
          actionText={"Mission Delivered"}
          action={(missionId) => handleDeliveringMissionsFromStarted(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VolunteerHomeMissionList
          missions={assignedMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromAssigned(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VolunteerHomeMissionList
          missions={suggestedMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          action={(missionId) => handleStartMissionFromSuggested(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <VolunteerHomeMissionList missions={completedMisssions} currentUser={currentUser} />
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
