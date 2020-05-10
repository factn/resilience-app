import { Grid } from "@material-ui/core";
import { Button } from "./";
import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import styled from "styled-components";
import { color } from "../../theme";

const StyledButton = styled(Button)`
  flex-grow: 1;
`;

/**
 * Button that facliitates unassigning a volunteer.
 *
 * @component
 */
const UnassignMeButton = ({ buttonClass, unassignMission }) => {
  return (
    <StyledButton
      style={{ backgroundColor: color.white, color: color.red, textDecoration: "underline" }}
      disableElevation
      onClick={unassignMission}
    >
      UNASSIGN ME
    </StyledButton>
  );
};

export default UnassignMeButton;
