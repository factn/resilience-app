import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { ReactComponent as AppleIcon } from "../../../img/apple.svg";
import { H1 } from "./styles";

const iconStyle = { marginRight: "1rem", width: "1.5rem", height: "1.5rem" };

const UnderText = styled.div`
  font-style: italic;
  /* margin-top: 1rem; */
  margin-left: 3rem;
  font-size: 0.8rem;
`;

function ButtonWithIcon({ children, disabled, icon, to, ...rest }) {
  const history = useHistory();
  return (
    <div>
      <Button {...rest} onClick={() => history.push(to)}>
        {icon}
        {children}
      </Button>
      {disabled && <UnderText>Coming Soon</UnderText>}
    </div>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  right: 0;
  left: 0;
  margin: auto;
`;

function StartPage() {
  return (
    <>
      <H1>What do you need help with?</H1>
      <ButtonContainer>
        <ButtonWithIcon to="/request/foodbox" icon={<AppleIcon style={iconStyle} />}>
          Food Box Delivery
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<AppleIcon style={iconStyle} />}>
          General Errand
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<AppleIcon style={iconStyle} />}>
          Pharmacy Run
        </ButtonWithIcon>
      </ButtonContainer>
    </>
  );
}

export default StartPage;
