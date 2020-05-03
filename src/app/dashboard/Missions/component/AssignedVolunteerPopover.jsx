import { Box } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";

import { Button, Body1 } from "../../../component";
import UsersAutocomplete from "../../../component/UsersAutocomplete";
import { makeStyles } from "@material-ui/core/styles";

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
}));

const AssignedVolunteerPopover = ({ boxRef, handleConfirmButton, onClose, open, volunteers }) => {
  const classes = useStyles();
  const [selectedVolunteer, setSelectedVolunteer] = useState();

  return (
    <Popover
      id="assigned-volunteer-popover"
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
            <b>Assign Volunteer</b>
          </Body1>
        </Box>

        <Box className={classes.row}>
          <Body1>
            Which volunteer do you want to <br />
            assign this mission to?
          </Body1>
        </Box>
        <Box className={classes.row}>
          <UsersAutocomplete handleChange={setSelectedVolunteer} users={volunteers} />
        </Box>
        <Box className={classes.row}>
          <Button
            fullWidth
            onClick={() => {
              handleConfirmButton(selectedVolunteer);
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};
export default AssignedVolunteerPopover;
