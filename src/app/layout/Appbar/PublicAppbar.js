import React from "react";
import { Link } from "react-router-dom";
import { AppbarContainer, AppbarDefault, LogoContainer } from "../../layout/Appbar/Appbar.style";
import { ReactComponent as Logo } from "../../../img/newlogo.svg";
import { StyledLink } from "./Appbar.style";

const PublicAppbar = (props) => {
  return (
    <AppbarContainer role="navigation">
      <AppbarDefault>
        <LogoContainer>
          <Link to="/" aria-label="Go to home">
            <Logo title="MutualAidLogo" role="img" height="82px" />
          </Link>
        </LogoContainer>
        <StyledLink to="/about">About Resilience App</StyledLink>
      </AppbarDefault>
    </AppbarContainer>
  );
};

export default PublicAppbar;
