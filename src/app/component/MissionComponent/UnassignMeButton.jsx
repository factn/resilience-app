import Button from "@material-ui/core/Button";
import React from "react";
import Mission from "../../model/Mission";

/**
 * Button that facliitates unassigning a volunteer.
 *
 * @component
 */
const UnassignMeButton = ({ mission, user }) => {
  function handleOnClick(e) {
    e.preventDefault();
    Mission.accept(user.uid, user, mission.uid);
  }

  return (
    <Button text disableElevation onClick={handleOnClick}>
      UNASSIGN ME
    </Button>
  );
};

export default UnassignMeButton;
