import Button from "@material-ui/core/Button";
import React from "react";
import Mission from "../../model/Mission";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.color.red,
  },
}));
/**
 * Button that facliitates unassigning a volunteer.
 *
 * @component
 */
const UnassignMeButton = ({ mission, user }) => {
  const classes = useStyles();

  function handleOnClick(e) {
    e.preventDefault();
    Mission.accept(user.uid, user, mission.uid);
  }

  return (
    <Button text disableElevation onClick={handleOnClick} className={classes.root}>
      UNASSIGN ME
    </Button>
  );
};

export default UnassignMeButton;
