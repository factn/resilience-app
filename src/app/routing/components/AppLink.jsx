import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AppLink({ children, to, ...rest }) {
  console.log("APPLINK to:", to);
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}

AppLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.element,
};

export default AppLink;
