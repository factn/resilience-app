import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import MuiCheckIcon from "@material-ui/icons/Check";
import MuiDoneAllIcon from "@material-ui/icons/DoneAll";
import MuiPlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import User from "../../model/User";
import Mission from "../../model/Mission";
import { getAllAssignedMissions, getAllInProgressMissions } from "./missionHelpers";
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";
import MissionTypeHeading from "./MissionTypeHeading";
import { volunteerDashboardEmptyTabMessage } from "../../../constants";
import { FoodBoxIcon, UserPhoneUnverifiedPopup } from "../../component";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabMargin: {
    marginTop: "1rem",
  },
  sectionHeadingStyles: {
    textAlign: "left",
  },
  tabSectionContainer: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
}));

export default function VolunteerHome({ currentUser }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [acceptedMissions, updateAssignedMissions] = useState([]);
  const [inProgressMissions, updateInProgressMissions] = useState([]);
  const [availableMissions, updateAvailableMissions] = useState([]);

  useEffect(() => {
    const fetchAllAssociatedMissions = async () => {
      const missions = await User.getAllAssociatedMissions(currentUser.uid);
      const availableMissions = await Mission.getAllAvailable();

      updateAvailableMissions(availableMissions);
      updateAssignedMissions(getAllAssignedMissions(missions, currentUser));
      updateInProgressMissions(getAllInProgressMissions(missions, currentUser));
    };

    if (!!currentUser && !!currentUser.uid) {
      fetchAllAssociatedMissions();
    }
  }, [currentUser]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleStartMission = (missionUid) => {
    if (!currentUser.phoneNumber) setPopUpOpen(true);

    Mission.start(currentUser.uid, currentUser, missionUid);

    // Move from Assigned to Started
    const mission = acceptedMissions.filter((m) => m.uid === missionUid);
    updateAssignedMissions(acceptedMissions.filter((m) => m.uid !== missionUid));
    updateInProgressMissions(inProgressMissions.concat(mission));
  };

  const handleAcceptMission = (missionUid) => {
    if (!currentUser.phoneNumber) setPopUpOpen(true);

    Mission.accept(currentUser.uid, currentUser, missionUid);

    // Move from Available to Accepted
    const mission = availableMissions.filter((m) => m.uid === missionUid);
    updateAssignedMissions(acceptedMissions.concat(mission));
    updateAvailableMissions(availableMissions.filter((m) => m.uid !== missionUid));
  };

  const handleDeliveringMissionsFromStarted = (missionUid) => {
    if (!currentUser.phoneNumber) {
      setPopUpOpen(true);
    } else {
      Mission.deliver(currentUser.uid, currentUser, missionUid);
      updateInProgressMissions(inProgressMissions.filter((m) => m.uid !== missionUid));
    }
  };

  const availableLabel = "Available (" + availableMissions.length + ")";
  const acceptedLabel = "Accepted (" + acceptedMissions.length + ")";
  const startedLabel = "In Progress (" + inProgressMissions.length + ")";
  const missionType = {
    label: "Food Box Missions",
    icon: <FoodBoxIcon />,
  };

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
        <MissionTypeHeading label={missionType.label} icon={missionType.icon}></MissionTypeHeading>
        <Box className={classes.tabSectionContainer}>
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            className={classes.sectionHeadingStyles}
          >
            Available
          </Typography>
          <VolunteerHomeMissionList
            missions={availableMissions}
            currentUser={currentUser}
            actionText="Accept Mission"
            actionIcon={<MuiCheckIcon />}
            showGroupAction={true}
            groupActionIcon={<MuiDoneAllIcon />}
            isEmptyText={volunteerDashboardEmptyTabMessage.available}
            action={(missionUid) => handleAcceptMission(missionUid)}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MissionTypeHeading label={missionType.label} icon={missionType.icon}></MissionTypeHeading>
        <Box className={classes.tabSectionContainer}>
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            className={classes.sectionHeadingStyles}
          >
            Scheduled
          </Typography>
          <VolunteerHomeMissionList
            missions={acceptedMissions}
            currentUser={currentUser}
            actionText="Start Mission"
            actionIcon={<MuiPlayCircleFilledIcon />}
            showGroupAction={true}
            groupActionIcon={<MuiPlayCircleFilledIcon />}
            isEmptyText={volunteerDashboardEmptyTabMessage.accepted}
            action={(missionUid) => handleStartMission(missionUid)}
          />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <MissionTypeHeading label={missionType.label} icon={missionType.icon}></MissionTypeHeading>
        <Box className={classes.tabSectionContainer}>
          <Typography
            component="h1"
            variant="h1"
            gutterBottom
            className={classes.sectionHeadingStyles}
          >
            In Progress
          </Typography>
          <VolunteerHomeMissionList
            missions={inProgressMissions}
            currentUser={currentUser}
            actionText={"Mission Delivered"}
            showViewRoute={true}
            isEmptyText={volunteerDashboardEmptyTabMessage.started}
            action={(missionUid) => handleDeliveringMissionsFromStarted(missionUid)}
          />
        </Box>
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
      {value === index && children}
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
