import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ReactComponent as Logo } from "../../../img/logo.svg";
import NavigationDrawer from "../NavigationDrawer/index";
import {
  AppbarContainer,
  AppbarDefault,
  LogoContainer,
  MenuContainer,
  AboutText,
} from "./Appbar.style";

const Appbar = ({ children }) => {
  const isEmpty = useSelector((state) => state.firebase.auth.isEmpty);
  function linkToAbout() {
    window.location = "/about";
  }
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
          {isEmpty ? <AboutText onClick={linkToAbout}>About Resilience App</AboutText> : null}
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
