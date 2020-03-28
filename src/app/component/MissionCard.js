import React from "react";
import { Card } from "../layout";
import { Typography } from "@material-ui/core";

const MissionCard = ({ mission }) => {
  function takeToMap() {
    return "";
  }
  return (
    <>
      {mission.url && <img alt="img here" height="auto" width="100%" src={mission.url} />}
      <Typography variant="h2">{mission.description}</Typography>
      <Typography variant="body1">{mission.details}</Typography>
      <h5 onClick={takeToMap}>📍 City, Street Address</h5>
      <div>
        <Typography variant="h4">status: {mission.status}</Typography>
      </div>
    </>
  );
};
export default MissionCard;
