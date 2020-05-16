import { Box } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import React, { useReducer } from "react";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import AddToGroupPopover from "./AddToGroupPopover";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../../model/Mission";
import PanToolIcon from "@material-ui/icons/PanTool";
import { v4 as uuidV4 } from "uuid";
import AssignedVolunteerPopover from "./AssignedVolunteerPopover";

const actions = {
  CLOSE: "close all popover",
  OPEN_MENU: "open the menu",
  OPEN_GROUP: "open the add to group popover",
  OPEN_VOLUNTEER: "open the assigne volunteer popover",
};
const initialMenuState = {
  openMenu: false,
  openAddToGroupPopover: false,
};

const useStyles = makeStyles((theme) => ({
  menuButton: {
    justifyContent: "left",
    width: "100%",
  },
  notActive: {
    color: "lightgrey",
  },
  readyToStart: {
    display: "none",
  },

  tentativeVolunteer: {
    color: " #fbb03b",
  },
  assignedVolunteer: {
    display: "none",
  },
}));

const menuReducer = (state, action) => {
  switch (action.type) {
    case actions.CLOSE:
      return { openMenu: false, openAddToGroupPopover: false, openVolunteerPopover: false };
    case actions.OPEN_MENU:
      return { openMenu: true, openAddToGroupPopover: false, openVolunteerPopover: false };
    case actions.OPEN_GROUP:
      return { openMenu: false, openAddToGroupPopover: true, openVolunteerPopover: false };
    case actions.OPEN_VOLUNTEER:
      return { openMenu: false, openAddToGroupPopover: false, openVolunteerPopover: true };
    default:
      throw new Error();
  }
};

const MissionItemMenu = ({ boxRef, className, groups, mission, volunteers }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);

  const handleClose = () => {
    dispatch({ type: actions.CLOSE });
  };
  const handleReadyToStartButton = () => {
    Mission.update(mission.uid, {
      readyToStart: !mission.readyToStart,
    });
    dispatch({ type: actions.CLOSE });
  };

  const handleAddOrRemoveGroup = () => {
    // add here
    if (!mission.groupUid) {
      dispatch({ type: actions.OPEN_GROUP });
    } else {
      Mission.update(mission.uid, {
        groupDisplayName: "",
        groupUid: "",
      });
    }
  };
  const handleAddToGroupConfirm = ({ groupDisplayName, groupUid }) => {
    if (groupUid) {
      Mission.update(mission.uid, {
        groupDisplayName,
        groupUid,
      });
    } else {
      Mission.update(mission.uid, {
        groupUid: uuidV4(),
        groupDisplayName,
      });
    }
    dispatch({ type: actions.CLOSE });
  };

  const handleVolunteerButton = () => {
    if (mission.volunteerDisplayName || mission.tentativeVolunteerDisplayName) {
      Mission.update(mission.uid, {
        volunteerDisplayName: "",
        volunteerUid: "",
        volunteerPhoneNumber: "",
        tentativeVolunteerDisplayName: "",
        tentativeVolunteerUid: "",
        tentativeVolunteerPhoneNumber: "",
        status: "tentative",
      });
    } else {
      dispatch({ type: actions.OPEN_VOLUNTEER });
    }
  };
  const handleConfirmVolunteer = (selected) => {
    if (selected) {
      Mission.assign(selected.uid, selected, mission.uid);
    }
    dispatch({ type: actions.CLOSE });
  };

  // menu only show up on planning phase for now
  if (![Mission.Status.tentative, Mission.Status.assigned].includes(mission.status)) {
    return null;
  }

  return (
    <>
      <Box
        className={className}
        aria-controls="mission-menu"
        aria-haspopup="true"
        role="button"
        onClick={() => dispatch({ type: actions.OPEN_MENU })}
      >
        <MoreVertIcon />
      </Box>

      <Popover
        id="mission-menu"
        open={state.openMenu}
        anchorEl={boxRef?.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid container direction="column">
          <Button
            className={classes.menuButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={handleAddOrRemoveGroup}
          >
            {mission.groupUid ? "Remove from Group" : "Add To Group"}
          </Button>
          <Button
            className={classes.menuButton}
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleReadyToStartButton}
          >
            {mission.readyToStart ? "Mark as Not Ready" : "Mark as Ready"}
          </Button>
          <Button
            className={classes.menuButton}
            startIcon={<PanToolIcon />}
            onClick={handleVolunteerButton}
          >
            {mission.volunteerDisplayName
              ? "Remove Volunteer"
              : mission.tentativeVolunteerDisplayName
              ? "Unsuggest Volunteer"
              : "Suggest Volunteer"}
          </Button>
        </Grid>
      </Popover>
      <AddToGroupPopover
        open={state.openAddToGroupPopover}
        onClose={handleClose}
        boxRef={boxRef}
        groups={groups}
        mission={mission}
        handleConfirmButton={handleAddToGroupConfirm}
      />
      <AssignedVolunteerPopover
        boxRef={boxRef}
        mission={mission}
        onClose={handleClose}
        open={state.openVolunteerPopover}
        volunteers={volunteers}
        handleConfirmButton={handleConfirmVolunteer}
      />
    </>
  );
};

export default MissionItemMenu;
