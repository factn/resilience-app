import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { isEmpty, isLoaded } from "react-redux-firebase";
import { Redirect, Route } from "react-router-dom";
import routes from "./routes";

function AppRoute({ children, ...rest }) {
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
              pathname: routes.login,
              state: {
                from: location,
                referrer: location,
                warning: true,
              },
            }}
          />
        )
      }
    />
  );
}

AppRoute.propTypes = {
  children: PropTypes.element,
};

export default AppRoute;
