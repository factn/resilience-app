import Button from "@material-ui/core/Button";
import React from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import Mission from "../../model/Mission";

/**
 * Button that facliitates starting a mission.
 *
 * @component
 */
const StartMissionButton = ({ mission, user }) => {
  function handleOnClick(e) {
    e.preventDefault();
    Mission.start(user.uid, user, mission.uid);
  }

  return (
    <Button
      onClick={handleOnClick}
      startIcon={<PlayCircleFilledIcon />}
      variant="contained"
      color="primary"
      fullWidth
    >
      START
    </Button>
  );
};

export default StartMissionButton;
