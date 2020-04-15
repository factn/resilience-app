import React from "react";
import { Box } from "@material-ui/core";
import { H5, Button } from "../../component";
import { MissionFundedStatus } from "../../model/schema";

import _ from "lodash";

export const MissionName = (value) => {
  return (
    <Box width="200px">
      <H5>{value.title}</H5>
      <div>
        <small>{value.type}</small>
      </div>
      <div>
        <a>View Mission Details</a>
      </div>
    </Box>
  );
};
export const TimeLocation = (value) => {
  if (!value) return null;
  return (
    <div>
      <div>{value.time?.startTime}</div>
      <div>{value.time?.timeWindowType}</div>
      <div>{value.location?.address}</div>
    </div>
  );
};

export const Funding = (value) => {
  if (!value) return null;
  let conf = {
    [MissionFundedStatus.fundedbyrecipient]: {
      text: "Funded by recipient",
      buttonText: "Approve Mission",
    },
    [MissionFundedStatus.fundedinkind]: {
      text: "Funded in kind",
      buttonText: "Approve Mission",
    },
    [MissionFundedStatus.fundingnotneeded]: {
      text: "Funding not needed",
      buttonText: "Approve Mission",
    },
    [MissionFundedStatus.fundedbydonation]: {
      text: "Funded By Donation",
      buttonText: "Approve Mission",
    },
    [MissionFundedStatus.notfunded]: {
      text: "Not Funded",
      buttonText: "Approve Funding",
    },
  };
  return (
    <div>
      <div>{conf[value.fundedStatus]?.text}</div>
      <Button>{conf[value.fundedStatus]?.buttonText}</Button>
    </div>
  );
};
