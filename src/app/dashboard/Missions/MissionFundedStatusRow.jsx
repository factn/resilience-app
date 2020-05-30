import React from "react";
import { Mission } from "../../model";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { Box, Grid } from "@material-ui/core";

const Row = ({ children, Icon }) => {
  if (!children) return null;
  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Box marginRight="5px" width="20px">
        {Icon && <Icon color="primary" />}
      </Box>
      {children}
    </Grid>
  );
};

const MissionFundedStatusRow = ({ classes, mission }) => {
  let missionFundedStatusText;
  switch (mission?.fundedStatus) {
    case Mission.FundedStatus.fundedbydonation:
      missionFundedStatusText = "Funded By Donation ${fundedDateText}";
      break;
    case Mission.FundedStatus.fundedbyrecipient:
      missionFundedStatusText = "Funded By Recipient ${fundedDateText}";
      break;
    case Mission.FundedStatus.fundingnotneeded:
      missionFundedStatusText = "Funding Not Needed";
      break;
    case Mission.FundedStatus.notfunded:
      missionFundedStatusText = "Not Yet Funded";
      break;
    default:
      throw Error("mission funded status not exist", mission.fundedStatus);
  }
  return (
    <Row Icon={AttachMoneyIcon} classes={classes}>
      {missionFundedStatusText}
    </Row>
  );
};

export default MissionFundedStatusRow;

