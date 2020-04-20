import { KeyboardDatePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";

/**
 * Wrapper component for KeybardDatePicker, which renders a text field and allows
 * selection of a date via a UI date picker.
 * @function
 * @param {string} id
 * @param {string} label
 * @param {string} margin
 * @param {string} value
 * @param {func} onChange
 */
const KeyDatePickerContainer = ({ id, label, margin, onChange, value, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <KeyboardDatePicker
      variant="inline"
      margin={margin}
      id={id}
      value={value}
      label={label}
      format="MM/dd/yyyy"
      onChange={(newDate) => {
        onChange(newDate);
        setIsOpen(false);
      }}
      KeyboardButtonProps={{
        onFocus: (e) => {
          setIsOpen(true);
        },
        "aria-label": "change date",
      }}
      PopoverProps={{
        disableRestoreFocus: true,
        onClose: () => {
          setIsOpen(false);
        },
      }}
      InputProps={{
        onFocus: () => {
          setIsOpen(true);
        },
      }}
      open={isOpen}
    />
  );
};
export default KeyDatePickerContainer;
