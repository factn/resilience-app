import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";

import RoutingService from "../services/RoutingService";
import { UserPermissionsService } from "../../model/permissions";

function AppRoute({ children, component, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  const [userRole, setUserRole] = useState(null);

  UserPermissionsService.getUserRole(auth).then((role) => {
    setUserRole(role);
  });

  const handleRender = ({ location }) => {
    let routeAccess;
    if (isLoaded(auth) && userRole) {
      routeAccess = RoutingService.canAccessRoute(location.pathname);
    }
    if (routeAccess) {
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
    }
  };

  return <Route {...rest} render={handleRender} />;
}

AppRoute.propTypes = {
  children: PropTypes.element,
  component: PropTypes.elementType,
};

export default AppRoute;
