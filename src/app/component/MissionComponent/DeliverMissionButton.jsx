import Button from "@material-ui/core/Button";
import React from "react";
import Mission from "../../model/Mission";

/**
 * Button that facliitates confirmation of mission delivery.
 *
 * @component
 */
const DeliverMissionButton = ({ mission, user }) => {
  function handleOnClick(e) {
    e.preventDefault();
    Mission.deliver(user.uid, user, mission.uid);
  }

  return (
    <Button onClick={handleOnClick} fullWidth variant="contained" color="primary">
      CONFIRM DELIVERY
    </Button>
  );
};

export default DeliverMissionButton;
