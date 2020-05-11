import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import React from "react";
import Mission from "../../../model/Mission";

const fundedOptions = [
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

const NotFundedStatusAction = ({ mission }) => {
  const handleChange = (event) => {
    event.preventDefault();
    //TODO move this to mission model as
    // Mission.setFunded()
    Mission.update(mission.uid, {
      fundedStatus: event.target.value,
      fundedDate: Date.now().toString(),
      status: Mission.Status.tentative,
    });
  };
  return (
    <FormControl>
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
        {fundedOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default NotFundedStatusAction;
