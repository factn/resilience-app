import styled, { css } from 'styled-components';
import { colors } from "../../../constants";
import { sizes, iconPositions } from './utils';

// Handles different button styles
const buttonStyles = {
  primary: css`
    background-color: ${colors.primary.background};
    box-sizing: border-box;
    border: 1px solid ${colors.primary.background};
  `,
  secondary: css`
    border: 1px solid ${colors.secondary.border};
    background-color: ${colors.secondary.background};
  `,
  tertiary: css`
    border: 1px solid ${colors.tertiary.border};
    background-color: ${colors.tertiary.background};
  `,
  rounded: css`
    border-radius: 25px;
  `
};

const StyledButton = styled.button`
  padding: 11px 16px;
  cursor: pointer;
  color: #ffffff;
  outline: none;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  ${props => sizes[props.size]};
  &:disabled {
    border: 1px solid ${colors.disabled.border};
    color: ${colors.disabled.color};
    background-color: ${colors.disabled.border};
    cursor: no-drop;
  }
  ${props => props.primary && buttonStyles['primary']};
  ${props => props.secondary && buttonStyles['secondary']};
  ${props => props.tertiary && buttonStyles['tertiary']};
  ${props => props.rounded && buttonStyles['rounded']};
`;

export const StyledIcon = styled.span`
  ${props => props.text && iconPositions[props.iconPosition]};
`;
export default StyledButton;
