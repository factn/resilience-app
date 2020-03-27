import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { ReactComponent as Logo } from "../../../img/logo.svg";
import { Page } from "../../layout";
import { BigLogo, MissionText, StyledHomeButton, StyledLink } from "./Home.style";

const HomePage = ({ history }) => {
  return (
    <Page>
      <BigLogo>
        <Logo />
      </BigLogo>
      <MissionText>Global Community, Local Mutual Aid</MissionText>
      <StyledHomeButton rounded text="Sign In/Up" onClick={() => history.push("/login")} />
      <StyledHomeButton rounded text="View Missons" onClick={() => history.push("/missions")} />
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
