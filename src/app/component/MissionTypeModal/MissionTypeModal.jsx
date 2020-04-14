import React from "react";
import { Container, Typography, ListItemIcon, Button } from "@material-ui/core";
import { Popup } from "../";

const StyledButton = styled(Button)`
  margin-top: 24px;
  flex-grow: 1;
`;

const MissionTypeModal = ({ onClose, opened }) => (
  <Popup open={opened} handleClose={onClose} btnText="close">
    <Container align="center">
      <Typography align="center" variant="h1">
        Choose a mission type
      </Typography>
      <StyledButton
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => {
          onClose();
          history.push(`/missions/new/food`);
        }}
      >
        food
      </StyledButton>
      <StyledButton
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => {
          onClose();
          history.push(`/missions/new/pharmacy`);
        }}
      >
        pharmacy
      </StyledButton>
      <StyledButton
        variant="outlined"
        size="large"
        color="primary"
        onClick={() => {
          onClose();
          history.push(`/missions/new/errand`);
        }}
      >
        errand
      </StyledButton>
    </Container>
  </Popup>
);

export default MissionTypeModal;
