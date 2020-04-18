import React from "react";
import { Box } from "@material-ui/core";

function MissionName({ title, type }) {
  return (
    <Box width="200px">
      <h5>{title}</h5>
      <div>
        <small>{type}</small>
      </div>
    </Box>
  );
}
export default MissionName;
