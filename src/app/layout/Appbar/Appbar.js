import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Logo } from "../../../img/logo.svg";
import NavigationDrawer from "../NavigationDrawer/index";
import { routes } from "../../routing";
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
      <AppbarDefault>
        <LogoContainer>
          <Link to={routes.home} aria-label="Go to home">
            <Logo title="MutualAidLogo" role="img" />
          </Link>
        </LogoContainer>
        {children || (
          <AboutLink to={routes.about} aria-label="Feed Folks - Studio City">
            Feed Folks - Studio City
          </AboutLink>
        )}
        <MenuContainer data-testid="MutualAidMenu">
          <NavigationDrawer />
        </MenuContainer>
      </AppbarDefault>
    </AppbarContainer>
  );
};

Appbar.propTypes = {
  children: PropTypes.element,
};
export default Appbar;
