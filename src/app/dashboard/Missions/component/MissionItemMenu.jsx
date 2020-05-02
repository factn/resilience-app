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

const actions = {
  OPEN_MENU: "open the menu",
  CLOSE: "close all popover",
  OPEN_GROUP: "open the add to group popover",
};
const initialMenuState = {
  openMenu: false,
  openAddToGroupPopover: false,
};
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
  const [state, dispatch] = useReducer(menuReducer, initialMenuState);
  const handleClose = () => {
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
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => dispatch({ type: actions.OPEN_GROUP })}
          >
            Add To Group
          </Button>
          <Button
            startIcon={<CheckCircleOutlineIcon />}
            onClick={() => dispatch({ type: actions.OPEN_GROUP })}
          >
            Mark as ready
          </Button>
        </Grid>
      </Popover>
      <AddToGroupPopover
        open={state.openAddToGroupPopover}
        onClose={handleClose}
        boxRef={boxRef}
        groups={groups}
        mission={mission}
      />
    </>
  );
};

export default MissionItemMenu;
