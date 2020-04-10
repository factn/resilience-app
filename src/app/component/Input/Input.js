import React from "react";
import PropTypes from "prop-types";
import {
  InputWrapper,
  StyledLabel,
  StyledInputDiv,
  StyledInput,
  StyledTextarea,
} from "./Input.style";

/**
 * A styled wrapper for handling different input types
 *
 * @component
 */
const Input = ({ inputType, dataId, inputName, label, onChange }) => {
  switch (inputType) {
    case "textarea":
      return (
        <InputWrapper>
          <StyledLabel>{label}</StyledLabel>
          <StyledInputDiv>
            <StyledTextarea
              onChange={onChange}
              rows={10}
              name={inputName}
              data-id={dataId}
              data-testid={`${dataId}-textarea`}
            ></StyledTextarea>
          </StyledInputDiv>
        </InputWrapper>
      );
    default:
      return (
        <InputWrapper>
          <StyledLabel>{label}</StyledLabel>
          <StyledInputDiv>
            <StyledInput
              name={inputName}
              onChange={onChange}
              data-testid={`${dataId}-${inputType}`}
              data-id={dataId}
              type={inputType}
            />
          </StyledInputDiv>
        </InputWrapper>
      );
  }
};

Input.propTypes = {
  inputType: PropTypes.string,
  dataId: PropTypes.string,
  inputName: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  inputType: "text",
  dataId: "",
  inputName: "",
  label: "",
};

export default Input;
