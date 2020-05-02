import { Box } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import React, { useReducer } from "react";
import _ from "../../../utils/lodash";
import Popover from "@material-ui/core/Popover";
import Grid from "@material-ui/core/Grid";
import AddToGroupPopover from "./AddToGroupPopover";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../../model/Mission";
import clsx from "clsx";
import { v4 as uuidV4 } from "uuid";

const actions = {
  OPEN_MENU: "open the menu",
  CLOSE: "close all popover",
  OPEN_GROUP: "open the add to group popover",
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
  readyToStart: {
    color: "green",
  },
}));

const menuReducer = (state, action) => {
  switch (action.type) {
    case actions.OPEN_MENU:
      return { openMenu: true, openAddToGroupPopover: false };
    case actions.CLOSE:
      return { openMenu: false, openAddToGroupPopover: false };
    case actions.OPEN_GROUP:
      return { openMenu: false, openAddToGroupPopover: true };
    default:
      throw new Error();
  }
};

const MissionItemMenu = ({ boxRef, className, groups, mission }) => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);
  const handleClose = () => {
    dispatch({ type: actions.CLOSE });
  };

  const handleReadyToStartButton = () => {
    Mission.update(mission.id, {
      readyToStart: !mission.readyToStart,
    });
    dispatch({ type: actions.CLOSE });
  };

  const handleAddOrRemoveGroup = () => {
    // add here
    if (!mission.groupId) {
      dispatch({ type: actions.OPEN_GROUP });
    } else {
      Mission.update(mission.id, {
        groupDisplayName: "",
        groupId: "",
      });
    }
  };
  const handleAddToGroupConfirm = ({ groupId, groupDisplayName }) => {
    if (groupId) {
      Mission.update(mission.id, {
        groupDisplayName,
        groupId,
      });
    } else {
      Mission.update(mission.id, {
        groupId: uuidV4(),
        groupDisplayName,
      });
    }
    dispatch({ type: actions.CLOSE });
  };

  return (
    <>
      <Box
        className={className}
        aria-controls="mission-menu"
        aria-haspopup="true"
        role="button"
        onClick={() => dispatch({ type: actions.OPEN_MENU })}
      >
        {mission.readyToStart && <CheckCircleOutlineIcon className={classes.readyToStart} />}
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
            {mission.groupId ? "Remove from Group" : "Add To Group"}
          </Button>
          <Button
            className={classes.menuButton}
            startIcon={<CheckCircleOutlineIcon />}
            onClick={handleReadyToStartButton}
          >
            {mission.readyToStart ? "Mark as Not Ready" : "Mark as Ready"}
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
    </>
  );
};

export default MissionItemMenu;
