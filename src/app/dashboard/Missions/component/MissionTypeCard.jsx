import React from "react";
import { Box } from "@material-ui/core";

function MissionType({ title, type }) {
  return (
    <Box width="200px">
      <h5>{type}</h5>
      <div>
        <small>{type}</small>
      </div>
    </Box>
  );
}
export default MissionType;
