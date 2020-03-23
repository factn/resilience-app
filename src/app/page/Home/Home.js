import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../../img/logo.svg";
import { Page } from "../../layout";
import {
  Header,
  HeaderSection,
  BigLogo,
  MissionText,
  StyledHomeButton,
  StyledLink,
} from "./Home.style";

const HomePage = () => {
  const HomePageHeader = (
    <Header>
      <HeaderSection>
        <Link to="/login">Login</Link>
      </HeaderSection>
      <HeaderSection>
        <Link to="/signup">Signup</Link>
      </HeaderSection>
    </Header>
  );

  return (
    <Page appbar={HomePageHeader}>
      <BigLogo>
        <Logo />
      </BigLogo>
      <MissionText>Global Community, Local Mutual Aid</MissionText>
      <StyledHomeButton rounded text="View Jobs" />
      <StyledHomeButton rounded text="Request Help" secondary />
      <StyledLink to="/about">About</StyledLink>
    </Page>
  );
};

export default HomePage;
