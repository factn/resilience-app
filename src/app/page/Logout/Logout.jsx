import React, { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { routes } from "../../routing";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";

const loadingStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  text: {
    textAlign: "center",
  },
}));

function Logout() {
  const classes = loadingStyles();
  const firebase = useFirebase();
  const history = useHistory();
  const [logoutNow, setLogoutNow] = useState(false);

  useEffect(() => {
    let c = setTimeout(() => {
      setLogoutNow(true);
    }, 1500);
    return function cleanup() {
      clearTimeout(c);
    };
  });

  function logoutUser() {
    firebase.logout().then(() => {
      history.push(routes.home);
    });
  }

  if (logoutNow) {
    logoutUser();
  }

  return (
    <div className={classes.root}>
      <LinearProgress />
      <h1 className={classes.text}>Signing out…</h1>
    </div>
  );
}

export default Logout;
