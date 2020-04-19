import React from "react";
import { useState } from "react";
import {
  Checkbox,
  Typography,
  TextField,
  Container,
  FormControlLabel,
  withStyles,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

/**
 * Wrapper component for KeybardDatePicker, which renders a text field and allows
 * selection of a date via a UI date picker. 
 * @function
 * @param {string} margin 
 * @param {string} id
 * @param {string} label
 * @param {string} value
 * @param {func} onChange
 */
const KeyDatePickerContainer = ({ id, label, margin, onChange, value }) => {
  const [selectedDate, handleDateChange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <KeyboardDatePicker
      variant="inline"
      margin={margin}
      id={id}
      value={value}
      label={label}
      format="MM/dd/yyyy"
      onChange={newDate => {
        onChange(newDate);
        handleDateChange(newDate);
        setIsOpen(false);
      }}
      KeyboardButtonProps={{
        onFocus: e => {
          setIsOpen(true);
        },
        "aria-label": "change date"
      }}
      PopoverProps={{
        disableRestoreFocus: true,
        onClose: () => {
          setIsOpen(false);
        }
      }}
      InputProps={{
        onFocus: () => {
          setIsOpen(true);
        }
      }}
      open={isOpen}
    />
  );
};
export default KeyDatePickerContainer;
