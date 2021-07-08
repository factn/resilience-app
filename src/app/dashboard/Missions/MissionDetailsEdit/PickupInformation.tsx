import React from "react";
import { MissionInterface } from "../../../model/schema";
import { Box, TextField } from "@material-ui/core";
import styled from "styled-components";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import useStyles from "./styles";
import { DateTimeInput } from "../../../component";

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

  const [pickUpTime, setPickUpTime] = React.useState(mission.pickUpWindow?.startTime || null);

  return (
    <MuiExpansionPanel
      elevation={0}
      classes={{ root: classes.expansion, expanded: classes.expanded }}
    >
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        classes={{ root: classes.summary, expanded: classes.summaryExpanded }}
      >
        <b>Pick Up Information</b>
      </ExpansionPanelSummary>
      <MuiExpansionPanelDetails classes={{ root: classes.details }}>
        <Box>
          <DateTimeInput
            value={pickUpTime}
            onChange={(value: string | null) => setPickUpTime(value)}
          />
        </Box>
      </MuiExpansionPanelDetails>
    </MuiExpansionPanel>
  );
};

export default RecipientInformation;
