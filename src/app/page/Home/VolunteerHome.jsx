import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import User from "../../model/User";
import Mission from "../../model/Mission";
import { getAllAssignedMissions, getAllStartedMissions } from "./missionHelpers";
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";
import { volunteerDashboardEmptyTabMessage } from "../../../constants";
import { UserPhoneUnverifiedPopup } from "../../component";
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
  const [value, setValue] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [acceptedMissions, updateAssignedMissions] = useState([]);
  const [startedMissions, updateStartedMissions] = useState([]);
  const [availableMissions, updateAvailableMissions] = useState([]);

  useEffect(() => {
    const fetchAllAssociatedMissions = async () => {
      const missions = await User.getAllAssociatedMissions(currentUser.uid);
      const availableMissions = await Mission.getAllAvailable();

      updateAvailableMissions(availableMissions);
      updateAssignedMissions(getAllAssignedMissions(missions, currentUser));
      updateStartedMissions(getAllStartedMissions(missions, currentUser));
    };

    if (!!currentUser && !!currentUser.uid) {
      fetchAllAssociatedMissions();
    }
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartMissionFromAssigned = (missionId) => {
    if (!currentUser.phoneNumber) {
      setPopUpOpen(true);
    } else {
      User.startMission(currentUser.uid, missionId);

      // Move from Assigned to Started
      const mission = acceptedMissions.filter((m) => m.id === missionId);
      updateAssignedMissions(acceptedMissions.filter((m) => m.id !== missionId));
      updateStartedMissions(startedMissions.concat(mission));
    }
  };

  const handleVolunteerMissionFromAvailable = (missionId) => {
    if (!currentUser.phoneNumber) {
      setPopUpOpen(true);
    } else {
      User.volunteerMission(currentUser.uid, missionId);

      // Move from Available to Accepted
      const mission = availableMissions.filter((m) => m.id === missionId);
      updateAssignedMissions(acceptedMissions.concat(mission));
      updateAvailableMissions(availableMissions.filter((m) => m.id !== missionId));
    }
  };

  const handleDeliveringMissionsFromStarted = (missionId) => {
    if (!currentUser.phoneNumber) {
      setPopUpOpen(true);
    } else {
      User.deliverMission(currentUser.uid, missionId);
      updateStartedMissions(startedMissions.filter((m) => m.id !== missionId));
    }
  };

  const availableLabel = "Available (" + availableMissions.length + ")";
  const acceptedLabel = "Accepted (" + acceptedMissions.length + ")";
  const startedLabel = "Started (" + startedMissions.length + ")";

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
          actionText="Accept Mission"
          isEmptyText={volunteerDashboardEmptyTabMessage.available}
          action={(missionId) => handleVolunteerMissionFromAvailable(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VolunteerHomeMissionList
          missions={acceptedMissions}
          currentUser={currentUser}
          actionText="Start Mission"
          isEmptyText={volunteerDashboardEmptyTabMessage.accepted}
          action={(missionId) => handleStartMissionFromAssigned(missionId)}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <VolunteerHomeMissionList
          missions={startedMissions}
          currentUser={currentUser}
          actionText={"Mission Delivered"}
          isEmptyText={volunteerDashboardEmptyTabMessage.started}
          action={(missionId) => handleDeliveringMissionsFromStarted(missionId)}
        />
      </TabPanel>
      <UserPhoneUnverifiedPopup open={popUpOpen} handleClose={() => setPopUpOpen(false)} />
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
