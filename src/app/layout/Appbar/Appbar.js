import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";

import {
  AppbarContainer,
  AppbarDefault,
  LogoContainer,
  MenuContainer,
} from "./Appbar.style";
import { ReactComponent as Logo } from "../../../img/logo.svg";

const Appbar = ({ children }) => {
  return (
    <AppbarContainer role="navigation">
      {children ? (
        children
      ) : (
        <AppbarDefault>
          <LogoContainer>
            <Logo title="MutualAidLogo" role="img" />
          </LogoContainer>
          <MenuContainer>
            <MenuIcon title="MutualAidMenu" />
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
