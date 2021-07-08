import { Box } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";
import GroupAutoComplete from "./GroupAutoComplete";

import { Button, Body1 } from "../../../component";
import { makeStyles } from "@material-ui/core/styles";
import _ from "../../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  popRoot: {
    padding: theme.spacing(2),
    justifyContent: "center",
    color: theme.color.blue,
  },
  popover: {
    width: "400px",
  },
  row: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
  inputLabel: {
    color: theme.palette.primary.main,
  },
}));

const AddToGroupPopover = ({ boxRef, groups, handleConfirmButton, mission, onClose, open }) => {
  const [selected, setSelected] = useState();
  const classes = useStyles();

  return (
    <Popover
      id="add-group-popover"
      open={open}
      anchorEl={boxRef?.current}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      classes={{ paper: classes.popover }}
    >
      <Box className={classes.popRoot}>
        <Box className={classes.row}>
          <Body1>
            <b>Add Mission to Group</b>
          </Body1>
        </Box>

        <Box className={classes.row}>
          <Body1>Which group do you want to add this mission to?</Body1>
        </Box>
        <form>
          <GroupAutoComplete groups={groups} handleChange={setSelected} mission={mission} />

          <Box className={classes.row}>
            <Button fullWidth onClick={() => handleConfirmButton(selected)}>
              Confirm
            </Button>
          </Box>
        </form>
      </Box>
    </Popover>
  );
};

export default AddToGroupPopover;
