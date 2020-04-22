import styled from "styled-components";

import { colors } from "../../../constants";

export const InputWrapper = styled.div`
  background-color: ${colors.tertiary.background};
  margin: 10px 25px 13px 25px;
`;

export const StyledInputDiv = styled.div`
  padding: 10px;
  background-color: #fff;
  margin-top: 10px;
`;

export const StyledInput = styled.input`
  border: 0;
  border-width: 0px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid ${colors.tertiary.border};
  &:focus {
    outline: 0;
  }
`;

export const StyledTextarea = styled.textarea`
  border: 0;
  border-width: 0px;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid ${colors.tertiary.border};
  &:focus {
    outline: 0;
  }
`;

export const StyledLabel = styled.label`
  display: flex;
  font-size: 16px;
  font-family: Arimo;
  color: #150e60;
  text-transform: uppercase;
`;
