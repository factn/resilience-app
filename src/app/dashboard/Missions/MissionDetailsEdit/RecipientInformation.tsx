import React from "react";
import { MissionInterface } from "../../../model/schema";
import { Box, TextField } from "@material-ui/core";
import styled from "styled-components";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";

const MainField = styled(TextField)`
  width: 13rem;
  margin-top: 1rem;
`;
const SecondaryField = styled(TextField)`
  margin-top: 1rem;
  width: 10rem;
  float: right;
`;
const RecipientInformation = ({ mission }: { mission: MissionInterface }) => {
  const classes = useStyles();
  return (
    <MuiExpansionPanel
      elevation={0}
      classes={{ root: classes.expansion, expanded: classes.expanded }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: classes.summary, expanded: classes.summaryExpanded }}
      >
        <b>Recipient Information</b>
      </ExpansionPanelSummary>
      <MuiExpansionPanelDetails classes={{ root: classes.details }}>
        <Box>
          <MainField
            value={mission.recipientDisplayName}
            label="Name"
            variant="outlined"
            size="small"
          />
          <SecondaryField
            value={mission.recipientPhoneNumber}
            label="Phone"
            variant="outlined"
            size="small"
          />
          <MainField
            value={mission.recipientEmailAddress}
            label="Email"
            variant="outlined"
            size="small"
          />
        </Box>
      </MuiExpansionPanelDetails>
    </MuiExpansionPanel>
  );
};

export default RecipientInformation;
