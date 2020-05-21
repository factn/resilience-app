import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { ReactComponent as AppleIcon } from "../../../img/apple.svg";
import { ReactComponent as ClipboardIcon } from "../../../img/clipboard.svg";
import { ReactComponent as PharmacyIcon } from "../../../img/pharmacy.svg";
import { routes } from "../../routing";
import { H1, H3, Body1, ContactComponent } from "../../component";

const iconStyle = { marginRight: "1rem", width: "1.5rem", height: "1.5rem" };

const UnderText = styled(Body1)`
  font-style: italic;
  margin-top: -1.5rem;
  margin-left: 4rem;
  font-size: 1rem;
`;

const outerDivStyle = (disabled) => {
  const style = { padding: "1rem" };
  if (disabled) style.opacity = "50%";
  return style;
};

function ButtonWithIcon({ children, disabled, icon, to, ...rest }) {
  const history = useHistory();
  return (
    <>
      <div style={outerDivStyle(disabled)}>
        <Button {...rest} onClick={() => history.push(to)}>
          {icon}
          {children}
        </Button>
      </div>
      {disabled && <UnderText color="primary">Coming Soon</UnderText>}
    </>
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

const PaperStyled = styled(Paper)`
  display: flex;
  margin: 3rem;
  padding: 1rem;
  border: ${({ theme }) => theme.palette.secondary.main} solid 1px;
`;
const PersonStyled = styled(Person)`
  margin-right: 0.5rem;
`;

function StartPage() {
  return (
    <>
      <H1 align="center">What do you need help with?</H1>
      <ButtonContainer>
        <ButtonWithIcon to={routes.request.foodbox} icon={<AppleIcon style={iconStyle} />}>
          <H3 color="primary">Food Box Delivery</H3>
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<ClipboardIcon style={iconStyle} />}>
          <H3 color="primary">General Errand</H3>
        </ButtonWithIcon>
        <ButtonWithIcon disabled icon={<PharmacyIcon style={iconStyle} />}>
          <H3 color="primary">Pharmacy Run</H3>
        </ButtonWithIcon>
      </ButtonContainer>
      <PaperStyled variant="outlined">
        <PersonStyled color="primary" />
        <Body1 align="left" gutterBottom={true}>
          If you would like to make a request by another method please get in touch with our
          volunteers
          <ContactComponent prefix=" at " />.
        </Body1>
      </PaperStyled>
    </>
  );
}

export default StartPage;
