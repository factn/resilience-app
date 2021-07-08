import MomentUtils from "@date-io/date-fns";
import { Box } from "@material-ui/core";
import {
  DatePicker as MuiDatePicker,
  TimePicker as MuiTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import React from "react";
import styled from "styled-components";

const DatePicker = styled(MuiDatePicker)`
  flex-grow: 1;
  margin-right: 30px;
`;
const TimePicker = styled(MuiTimePicker)`
  flex-grow: 1;
`;

/**
 * Wrapper component for KeybardDatePickerContainer and KeyboadTimePicker
 * which accepts a value object that has 'time' and 'date' props and will
 * update that object via the onChange handler
 * @function
 * @param {string} value
 * @param {func} onChange
 */
const DateTimeInput = ({ onChange, value }: { value: string | null; onChange: Function }) => {
  function getDateTime(time: string | null) {
    if (!time) {
      return null;
    }
    return new Date(time);
  }
  const time = getDateTime(value);

  const handleChange = (date: any) => {
    if (date === null) {
      onChange("");
    } else {
      onChange(date.toISOString());
    }
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Box display="flex">
        <DatePicker
          clearable
          onChange={handleChange}
          value={time}
          format="MM/dd/yyyy"
          id="datetime-input-date"
          label="Date"
        />
        <TimePicker
          id="datetime-input-time"
          label="Time"
          value={time}
          onChange={handleChange}
          clearable
        />
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimeInput;
