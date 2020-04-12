import React from "react";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoaded(auth) && !isEmpty(auth) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element,
};

export default ProtectedRoute