import { Box, Grid } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import React, { useState } from "react";

import { Button, Body1 } from "../../../component";
import UsersAutocomplete from "../../../component/UsersAutocomplete";
import User from "../../../model/User";
import { connect } from "react-redux";
import _ from "../../../utils/lodash";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  popRoot: {
    padding: theme.spacing(2),
    justifyContent: "center",
    color: theme.color.blue,
  },
  assignVolunteerPopover: {
    width: "400px",
  },
  row: {
    textAlign: "center",
    paddingBottom: theme.spacing(1),
  },
}));

const TentativeStatusAction = ({ mission, boxRef, volunteers }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState();

  const handleClick = () => {
    setOpen(!open);
  };
  const handleConfirmVolunteer = () => {
    if (!selected) setOpen(false);
    User.assignedMission(selected.id, mission.id);
    setOpen(false);
  };

  return (
    <Grid container>
      <Grid item>
        <Button
          aria-describedby="assgined-volunteer-popover"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Assigned Volunteer
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined">Add To Group</Button>
      </Grid>

      <Popover
        id="assigned-volunteer-popover"
        open={open}
        anchorEl={boxRef?.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        classes={{ paper: classes.assignVolunteerPopover }}
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
            <UsersAutocomplete handleChange={setSelected} users={volunteers} />
          </Box>
          <Box className={classes.row}>
            <Button fullWidth onClick={handleConfirmVolunteer}>
              Confirm
            </Button>
          </Box>
        </Box>
      </Popover>
    </Grid>
  );
};

export default connect((state) => ({
  volunteers: state.firestore.ordered.volunteers,
}))(TentativeStatusAction);
