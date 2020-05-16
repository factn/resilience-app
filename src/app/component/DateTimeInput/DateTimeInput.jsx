import MomentUtils from "@date-io/date-fns";
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import KeyDatePickerContainer from "../../page/MissionCreate/KeyDatePickerContainer";
import PropTypes from "prop-types";
import React from "react";

/**
 * Wrapper component for KeybardDatePickerContainer and KeyboadTimePicker
 * which accepts a value object that has 'time' and 'date' props and will
 * update that object via the onChange handler
 * @function
 * @param {object} dateInputProps
 * @param {object} timeInputProps
 * @param {string} value
 * @param {func} onChange
 */
const DateTimeInput = ({ dateInputProps, onChange, required, timeInputProps, value }) => {
  const handleChange = (field, newValue) => {
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  const datePickerContainerProps = {
    id: "datetime-input-date",
    label: "Date",
    margin: "normal",
    ...dateInputProps,
  };

  const timePickerProps = {
    id: "datetime-input-time",
    label: "Time",
    margin: "normal",
    ...timeInputProps,
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <KeyDatePickerContainer
        onChange={(val) => handleChange("date", val)}
        required={required}
        value={value.date}
        margin="normal"
        format="MM/dd/yyyy"
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        {...datePickerContainerProps}
      />
      <KeyboardTimePicker
        value={value.time}
        required={required}
        onChange={(val) => handleChange("time", val)}
        KeyboardButtonProps={{ "aria-label": "change time" }}
        {...timePickerProps}
      />
    </MuiPickersUtilsProvider>
  );
};

DateTimeInput.propTypes = {
  dateInputProps: PropTypes.object,
  timeInputProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    time: PropTypes.object,
    date: PropTypes.object,
  }).isRequired, // Strict shape not enforced, object can contain other properties (like 'location')
};

export default DateTimeInput;
