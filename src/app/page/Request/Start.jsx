import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { ReactComponent as AppleIcon } from "../../../img/apple.svg";
import { ReactComponent as ClipboardIcon } from "../../../img/clipboard.svg";
import { ReactComponent as PharmacyIcon } from "../../../img/pharmacy.svg";
import { ReactComponent as PhoneIcon } from "../../../img/phone.svg";
import { H1 } from "./styles";

const iconStyle = { marginRight: "1rem", width: "1.5rem", height: "1.5rem" };

const UnderText = styled.div`
  font-style: italic;
  margin-top: 0;
  margin-left: 3rem;
  font-size: 0.8rem;
`;

const outerDivStyle = (disabled) => {
  const style = { padding: "1rem" };
  if (disabled) style.opacity = "50%";
  return style;
};

function ButtonWithIcon({ children, disabled, icon, to, ...rest }) {
  const history = useHistory();
  return (
    <div style={outerDivStyle(disabled)}>
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
  padding-top: 1rem;
  margin: auto;
`;

const CallBoxText = styled.div`
  width: 15rem;
  margin: 0 auto;
  text-align: left;
  padding: 0.8rem;
  box-shadow: 0px 7px 12px grey;
`;

const phoneIconStyle = {
  marginRight: "1rem",
  width: "2rem",
  height: "2rem",
  position: "relative",
  top: "1rem",
  right: "7rem",
  background: "blue",
  borderRadius: "24px",
  padding: "8px",
};

function StartPage() {
  return (
    <>
      <H1>What do you need help with?</H1>
      <ButtonContainer>
        <ButtonWithIcon to="/request/foodbox" icon={<AppleIcon style={iconStyle} />}>
          Food Box Delivery
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<ClipboardIcon style={iconStyle} />}>
          General Errand
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<PharmacyIcon style={iconStyle} />}>
          Pharmacy Run
        </ButtonWithIcon>
      </ButtonContainer>
      <div>
        <PhoneIcon style={phoneIconStyle} />
        <CallBoxText>
          To serve those without technology, call the number below to contact our volunteers to help
          you make a request by phone. Call: <a href="tel:+15555555555">555-555-5555</a>.
        </CallBoxText>
      </div>
    </>
  );
}

export default StartPage;
