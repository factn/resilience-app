import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { RoutingService } from "../index";
import { useSelector } from "react-redux";
import { UserPermissionsService } from "../../model/permissions";
import { isLoaded } from "react-redux-firebase";

function AppLink({ children, to, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    if (isLoaded(auth) && UserPermissionsService.role) {
      const routeAccess = RoutingService.canAccessRoute(to);
      setCanAccess(routeAccess.permissionGranted);
    }
  }, [auth, to]);

  if (canAccess) {
    return (
      <Link to={to} {...rest}>
        {children}
      </Link>
    );
  } else {
    return null;
  }
}

AppLink.propTypes = {
  to: PropTypes.string,
  children: PropTypes.element,
};

export default AppLink;
