import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NavigationDrawer from "../NavigationDrawer/index";
import MenuIcon from "@material-ui/icons/Menu";
import { AppbarContainer, AppbarDefault, LogoContainer, MenuContainer } from "./Appbar.style";
import { ReactComponent as Logo } from "../../../img/logo.svg";

const Appbar = ({ children }) => {
  return (
    <AppbarContainer role="navigation">
      {children ? (
        children
      ) : (
        <AppbarDefault>
          <LogoContainer>
            <Link to="/">
              <Logo title="MutualAidLogo" role="img" />
            </Link>
          </LogoContainer>
          <MenuContainer>
            <NavigationDrawer />
          </MenuContainer>
        </AppbarDefault>
      )}
    </AppbarContainer>
  );
};

Appbar.propTypes = {
  children: PropTypes.any,
};
export default Appbar;
