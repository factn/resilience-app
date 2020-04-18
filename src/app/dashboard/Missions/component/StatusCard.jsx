import React from "react";
import styled from "styled-components";

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Mission from "../../../model/Mission";

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
const Status = ({ fundedStatus, id, isReady, onShowDetails, status }) => {
  if (!status) return null;

  return (
    <div>
      {status === "unassigned" ? <UnasignedStatusAction missionId={id} /> : status}
      <SelectedMissionId onClick={onShowDetails}>View Missions Details</SelectedMissionId>
    </div>
  );
};

export default Status;
