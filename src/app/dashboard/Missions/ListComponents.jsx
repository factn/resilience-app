import React from "react";
import { Box } from "@material-ui/core";
import { H5 } from "../../component";
import styled from "styled-components";

const SelectedMissionId = styled.div`
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
`;

function MissionName({ title, type, onShowDetails }) {
  return (
    <Box width="200px">
      <H5>{title}</H5>
      <div>
        <small>{type}</small>
      </div>
      <SelectedMissionId onClick={onShowDetails}>View Details</SelectedMissionId>
    </Box>
  );
}

const TimeLocation = (value) => {
  if (!value) return null;
  let {
    time: { startTime, timeWindowType },
    location,
  } = value;
  if (Object.keys(startTime).length === 0 && startTime.constructor === Object) {
    startTime = "";
  }

  return (
    <div>
      <div>{String(startTime)}</div>
      <div>{timeWindowType}</div>
      <div>{location?.address}</div>
    </div>
  );
};

const Funding = (value) => {
  if (!value) return null;
  return (
    <div>
      <div>{value?.text}</div>
    </div>
  );
};

export { MissionName, TimeLocation, Funding };
