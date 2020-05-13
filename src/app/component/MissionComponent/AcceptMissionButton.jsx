import Button from "@material-ui/core/Button";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import Mission from "../../model/Mission";

/**
 * @param {user} the user that accept the mission
 * @param {mission} the mission to be accepted for
 */
const AcceptMissionButton = ({ handleUpdatedMissions, mission, user }) => {
  function handleOnClick(e) {
    e.preventDefault();
    Mission.accept(user.uid, user, mission.uid);
  }

  return (
    <Button
      onClick={handleOnClick}
      startIcon={<CheckIcon />}
      variant="contained"
      color="primary"
      fullWidth
    >
      ACCEPT
    </Button>
  );
};

export default AcceptMissionButton;
