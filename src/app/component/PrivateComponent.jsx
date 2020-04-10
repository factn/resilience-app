import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";

/**
 * A wrapper for any component requiring auth
 *
 * @component
 */
function PrivateComponent({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return isLoaded(auth) && !isEmpty(auth) && <>{children}</>;
}

PrivateComponent.propTypes = {
  children: PropTypes.any,
};

export default PrivateComponent