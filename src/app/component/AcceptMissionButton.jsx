import { Grid } from "@material-ui/core";
import { Button } from "./";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";

/**
 * Button that facliitates accepting a mission.
 *
 * @component
 */
const AcceptMissionButton = ({ acceptMission, buttonClass }) => {
  return (
    <Button size="medium" onClick={acceptMission} className={buttonClass}>
      <CheckIcon /> ACCEPT
    </Button>
  );
};

export default AcceptMissionButton;
