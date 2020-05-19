import React, { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ComingSoon } from "../../component";
import { USER_ROLES } from "../../model/permissions/UserPermissionsService";
import { routes } from "../../routing";
import { makeStyles } from "@material-ui/core/styles";
import { isLoaded } from "react-redux-firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserPermissionsService } from "../../model/permissions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50% auto",
  },
}));
const AuthenticatedHome = ({ auth }) => {
  const classes = useStyles();
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isLoaded(auth)) {
      UserPermissionsService.getUserRole(auth).then((role) => {
        setRole(role);
      });
    }
  }, [auth]);

  if (role) {
    if (role === USER_ROLES.ORGANIZER) {
      return <Redirect to={redirect(routes.organizer.dashboard.home)} />;
    } else if (role === USER_ROLES.VOLUNTEER) {
      return <Redirect to={redirect(routes.volunteer.dashboard.home)} />;
    } else if (role === USER_ROLES.USER) {
      return <ComingSoon />;
    }
  } else {
    return (
      <div className={classes.root}>
        <CircularProgress size="3rem" />
      </div>
    );
  }

  function redirect(path) {
    return {
      pathname: path,
      state: {
        from: location,
      },
    };
  }
};

AuthenticatedHome.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default AuthenticatedHome;
