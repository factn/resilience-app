import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React from "react";
import Mission from "../../../model/Mission";
import styled from "styled-components";

const statuses = [
  {
    value: Mission.Status.started,
    text: "Started",
  },
  {
    value: Mission.Status.delivered,
    text: "Delivered",
  },
  {
    value: Mission.Status.succeeded,
    text: "Succeded",
  },
  {
    value: Mission.Status.failed,
    text: "Failed",
  },
];

const StyledSelect = styled(Select)`
  > select {
    padding: 8px !important;
  }
`;

const DeliveredAction = ({ mission }) => {
  const handleChange = (event) => {
    event.preventDefault();
    Mission.update(mission.uid, {
      status: event.target.value,
    });
  };
  return (
    <FormControl>
      <StyledSelect
        native
        onChange={handleChange}
        variant="outlined"
        value={mission.status}
        inputProps={{
          name: "status",
          id: "select-status",
        }}
      >
        {statuses.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default DeliveredAction;
