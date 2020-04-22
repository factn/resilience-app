import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";

function PrivateComponent({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return isLoaded(auth) && !isEmpty(auth) && <>{children}</>;
}

PrivateComponent.propTypes = {
  children: PropTypes.node,
};

export default PrivateComponent;
