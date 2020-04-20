import React from "react";
import styled from "styled-components";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../../model/Mission";
import PanToolIcon from "@material-ui/icons/PanTool";
import { Button } from "../../../component";
import { Grid, Box } from "@material-ui/core";

import _ from "../../../utils/lodash";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  select: {
    width: "100px",
  },
}));

const SelectedMissionId = styled.div`
  text-decoration: underline;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
  padding-left: 11px;
`;

const RowWithIcon = styled(Grid)`
  flex-wrap: nowrap;
  alignitems: center;
`;

const RowBody = ({ Icon, children }) => {
  return (
    <RowWithIcon container>
      <Box marginRight="5px" width="20px">
        {Icon && <Icon color="primary" />}
      </Box>
      {children}
    </RowWithIcon>
  );
};

const UnasignedStatus = ({ missionId }) => {
  const classes = useStyles();
  const handleChange = (event) => {
    event.preventDefault();
    Mission.update(missionId, {
      fundedStatus: event.target.value,
      status: Mission.Status.tentative,
    });
  };
  const options = [
    {
      value: Mission.FundedStatus.fundedbyrecipient,
      text: "Funded By Recipient",
    },
    {
      value: Mission.FundedStatus.fundedbydonation,
      text: "Funded By Donation",
    },
    {
      value: Mission.FundedStatus.fundingnotneeded,
      text: "Funding Not Needed",
    },
  ];
  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          native
          onChange={handleChange}
          variant="outlined"
          value="Not Yet Funded"
          inputProps={{
            name: "funded",
            id: "select-funded",
          }}
        >
          <option value="none" hidden aria-label="None">
            Not Yet Funded
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const TentativeStatus = () => {
  return <Button>Assign Mission</Button>;
};
const AssignedStatus = ({ mission }) => {
  const { volunteerName } = mission;
  return <RowBody Icon={PanToolIcon}>{volunteerName} - tentative</RowBody>;
};
const AcceptedStatus = ({ mission }) => {
  const { volunteerName } = mission;
  return <RowBody Icon={PanToolIcon}>{volunteerName} - accepted</RowBody>;
};

const Status = ({ mission, onShowDetails }) => {
  if (!_.get(mission, "status")) return null;
  let id = _.get(mission, "id");

  let StatusCol = null;
  switch (mission.status) {
    case Mission.Status.unassigned:
      StatusCol = <UnasignedStatus missionId={id} />;
      break;
    case Mission.Status.tentative:
      StatusCol = <TentativeStatus missionId={id} />;
      break;
    case Mission.Status.assigned:
      StatusCol = <AssignedStatus mission={mission} />;
    case Mission.Status.accepted:
      StatusCol = <AcceptedStatus mission={mission} />;
      break;
  }

  return (
    <div>
      {StatusCol}
      <SelectedMissionId onClick={onShowDetails}>View Details</SelectedMissionId>
    </div>
  );
};

export default Status;
