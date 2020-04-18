import React from "react";
import { Box, Grid } from "@material-ui/core";
import styled from "styled-components";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../model/Mission";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import _ from "../../utils/lodash";

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

const UnasignedStatusAction = ({ missionId }) => {
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
      value: Mission.FundedStatus.fundedinkind,
      text: "Funded In Kind",
    },
    {
      value: Mission.FundedStatus.fundingnotneeded,
      text: "Funding Not Needed",
    },
  ];
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-funded">Funded status</InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{
            name: "funded",
            id: "select-funded",
          }}
        >
          <option value="none" selected disabled hidden aria-label="None" />
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
const Status = ({ status, onShowDetails, fundedStatus, isReady, id }) => {
  if (!status) return null;

  return (
    <div>
      {status === "unassigned" ? <UnasignedStatusAction missionId={id} /> : status}
      <SelectedMissionId onClick={onShowDetails}>View Missions Details</SelectedMissionId>
    </div>
  );
};

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

const TimeLocationGrid = styled(Grid)`
  flex-wrap: nowrap;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeLocation = ({ location, time }) => {
  if (_.isEmpty(time.startTime) && !_.isDate(time.startTime)) {
    time = "";
  }

  return (
    <div>
      <TimeLocationGrid container>
        <Box margin="0 5px">
          <AccessTimeIcon />
        </Box>
        <Box>
          {_.get(time, "startTime")}
          <div>{_.get(time, "timeWindowType")}</div>
        </Box>
      </TimeLocationGrid>
      <TimeLocationGrid container>
        <Box margin="0 5px">
          <LocationOnIcon />
        </Box>
        {_.get(location, "address")}
      </TimeLocationGrid>
    </div>
  );
};

export { MissionName, TimeLocation, Status };
