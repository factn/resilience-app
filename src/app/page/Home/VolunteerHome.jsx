import { Box, Paper, Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import MuiCheckIcon from "@material-ui/icons/Check";
import MuiDoneAllIcon from "@material-ui/icons/DoneAll";
import MuiPlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import { useOrganization } from "../../model";
import Mission from "../../model/Mission";
import User from "../../model/User";

import {
  getAllAvailableMissions,
  getAllAcceptedMissions,
  getAllInProgressMissions,
} from "./missionHelpers";
import { useFirestoreConnect } from "react-redux-firebase";
import VolunteerHomeMissionList from "./VolunteerHomeMissionList";
import MissionTypeHeading from "./MissionTypeHeading";
import { volunteerDashboardEmptyTabMessage } from "../../../constants";
import { FoodBoxIcon, UserPhoneUnverifiedPopup } from "../../component";
import { Page } from "../../layout";
import { H1, Div } from "../../component";
import { connect } from "react-redux";

import _ from "../../utils/lodash";

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

const VolunteerHome = ({ currentUser, missions }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userPhoneUnverifiedPopupOpen, setUserPhoneUnverifiedPopupOpen] = useState(false);
  const org = useOrganization();
  useFirestoreConnect(() => {
    return [
      Mission.fsAvailableUserMissions(org.uid, currentUser.uid),
      Mission.fsAssignedUserMissions(org.uid, currentUser.uid),
    ];
  });

  const availableMissions = getAllAvailableMissions(missions);
  const acceptedMissions = getAllAcceptedMissions(missions);
  const inProgressMissions = getAllInProgressMissions(missions);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const availableLabel = "Available (" + availableMissions.length + ")";
  const acceptedLabel = "Accepted (" + acceptedMissions.length + ")";
  const startedLabel = "In Progress (" + inProgressMissions.length + ")";
  const missionType = {
    label: "Food Box Missions",
    icon: <FoodBoxIcon />,
  };

  return (
    <Page>
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
          <MissionTypeHeading
            label={missionType.label}
            icon={missionType.icon}
          ></MissionTypeHeading>
          <Box className={classes.tabSectionContainer}>
            <H1 component="h1" gutterBottom className={classes.sectionHeadingStyles}>
              Available
            </H1>
            <VolunteerHomeMissionList
              missions={availableMissions}
              currentUser={currentUser}
              actionText="Accept Mission"
              actionIcon={<MuiCheckIcon />}
              showGroupAction={true}
              groupActionIcon={<MuiDoneAllIcon />}
              isEmptyText={volunteerDashboardEmptyTabMessage.available}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MissionTypeHeading
            label={missionType.label}
            icon={missionType.icon}
          ></MissionTypeHeading>
          <Box className={classes.tabSectionContainer}>
            <H1 component="h1" gutterBottom className={classes.sectionHeadingStyles}>
              Scheduled
            </H1>
            <VolunteerHomeMissionList
              missions={acceptedMissions}
              currentUser={currentUser}
              actionText="Start Mission"
              actionIcon={<MuiPlayCircleFilledIcon />}
              checkGroupActionDisabled={(missions) =>
                _.some(missions, (mission) => !mission.readyToStart)
              }
              showGroupAction={true}
              groupActionIcon={<MuiPlayCircleFilledIcon />}
              isEmptyText={volunteerDashboardEmptyTabMessage.accepted}
            />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MissionTypeHeading
            label={missionType.label}
            icon={missionType.icon}
          ></MissionTypeHeading>
          <Box className={classes.tabSectionContainer}>
            <H1 component="h1" gutterBottom className={classes.sectionHeadingStyles}>
              In Progress
            </H1>
            <VolunteerHomeMissionList
              missions={inProgressMissions}
              currentUser={currentUser}
              actionText={"Mission Delivered"}
              showViewRoute={true}
              isEmptyText={volunteerDashboardEmptyTabMessage.started}
            />
          </Box>
        </TabPanel>
        <UserPhoneUnverifiedPopup
          open={userPhoneUnverifiedPopupOpen}
          handleClose={() => setUserPhoneUnverifiedPopupOpen(false)}
        />
      </div>
    </Page>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.firebase.auth,
    missions: Mission.selectAssignedUserMissions(state).concat(
      Mission.selectAvailableUserMissions(state)
    ),
  };
};

export default connect(mapStateToProps)(VolunteerHome);

function TabPanel(props) {
  const { children, index, value, ...other } = props;

  return (
    <Div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Div>
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
