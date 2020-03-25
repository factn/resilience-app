import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

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

const HomePage = ({ history }) => {
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
      <StyledHomeButton rounded text="View Jobs" onClick={() => history.push("/requests")} />
      <StyledHomeButton
        onClick={() => history.push("/request/create")}
        rounded
        text="Request Help"
        secondary
      />
      <StyledLink to="/about">About</StyledLink>
    </Page>
  );
};

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(HomePage);
