import styled from "styled-components";
import { colors } from "../../../constants";

export const InputWrapper = styled.div`
  padding: 15px;
  background-color: ${colors.tertiary.background};
`;

export const StyledInputDiv = styled.div`
  padding: 10px;
  background-color: #FFF;
  margin-top: 10px;
`;

export const StyledInput = styled.input`
  border: 0;
  border-width:0px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid ${colors.tertiary.border};
  &:focus {
    outline: 0;
  }
`;

export const StyledTextarea = styled.textarea`
  border: 0;
  border-width:0px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid ${colors.tertiary.border};
  &:focus {
    outline: 0;
  }
`

export const StyledLabel = styled.label`
  display: flex;
  font-size: 16px;
`;
