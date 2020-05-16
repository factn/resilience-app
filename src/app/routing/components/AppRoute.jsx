import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import RoutingService from "../services/RoutingService";

function AppRoute({ children, component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  const handleRender = ({ location }) => {
    const routeAccess = RoutingService.useAuth(auth).canAccessRoute(location.pathname);
    if (routeAccess.permissionGranted) {
      return component ? React.createElement(component, rest) : children;
    } else {
      return (
        <Redirect
          to={{
            pathname: routeAccess.route,
            state: {
              from: location,
              referrer: location,
              warning: true,
            },
          }}
        />
      );
    }
  };
  return <Route {...rest} render={handleRender} />;
}

AppRoute.propTypes = {
  children: PropTypes.element,
  component: PropTypes.elementType,
};

export default AppRoute;
