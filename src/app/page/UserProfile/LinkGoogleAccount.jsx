import React from "react";

import { Card } from "../../layout";
import { Button, H5 } from "../../component";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../../img/Google__G__Logo.png";

const useStyles = makeStyles(() => ({
  logoContainer: {
    height: "48px",
    width: "48px",
  },
  button: {
    height: "36px",
    width: "100px",
  },
}));

const LinkGoogleAccount = ({ data, provider, auth, errorHandler }) => {
  const classes = useStyles();
  async function onLinkClick() {
    try {
      await auth.currentUser.linkWithPopup(provider);
      /*  TODO: hard reload problem
      not hard reload
      I tried with ( in UserProfile.js )
        firebase.watchEvent('value', 'auth')
        firebase.auth().onAuthStateChanged
        so, conclusion -> firebase.auth.providerData change in firebase
        but does not notify on system on that
      */
      window.location.reload(false);
    } catch (error) {
      errorHandler(error);
    }
  }
  async function onUnlinkClick() {
    try {
      await auth.currentUser.unlink(data.providerId);
      window.location.reload(false);
    } catch (error) {}
  }
  return (
    <Card>
      <Grid container alignItems="center" space="1">
        <Grid item container>
          <H5>Google</H5>
        </Grid>

        <Grid item container xs={6}>
          <Avatar src={logo}></Avatar>
        </Grid>

        {data ? (
          <Button
            className={classes.button}
            color="secondary"
            variant="contained"
            size="small"
            onClick={onUnlinkClick}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            size="large"
            onClick={onLinkClick}
          >
            Connect
          </Button>
        )}
      </Grid>
    </Card>
  );
};

export default LinkGoogleAccount;
