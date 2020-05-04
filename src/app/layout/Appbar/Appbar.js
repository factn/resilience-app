import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../../img/logo.svg";
import NavigationDrawer from "../NavigationDrawer/index";
import {
  AboutLink,
  AppbarContainer,
  AppbarDefault,
  LogoContainer,
  MenuContainer,
} from "./Appbar.style";

const Appbar = ({ children }) => {
  return (
    <AppbarContainer role="navigation">
      {children ? (
        children
      ) : (
        <AppbarDefault>
          <LogoContainer>
            <Link to="/" aria-label="Go to home">
              <Logo title="MutualAidLogo" role="img" />
            </Link>
          </LogoContainer>
          <AboutLink to="/about" aria-label="About Resilience App">
            About Resilience App
          </AboutLink>
          <MenuContainer data-testid="MutualAidMenu">
            <NavigationDrawer />
          </MenuContainer>
        </AppbarDefault>
      )}
    </AppbarContainer>
  );
};

Appbar.propTypes = {
  children: PropTypes.element,
};
export default Appbar;
