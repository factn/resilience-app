import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { useFirebase, useFirestore, isLoaded, isEmpty } from "react-redux-firebase";
import { Page, Card } from "../../layout";
import { Chip, Button } from "../../component";
import { Typography, Grid, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../../../img/Google__G__Logo.png";

const useStyles = makeStyles((theme) => ({
  logoContainer: {
    height: "48px",
    width: "48px",
  },
}));

const LinkGoogleAccount = ({ data, auth, errorHandler }) => {
  const classes = useStyles();
  async function onGoogleClick() {
    var provider = new auth.GoogleAuthProvider();
    try {
      const credential = await auth.currentUser.linkWithPopup(provider).then(/* redirect */);
    } catch (error) {
      errorHandler(error);
    }
  }
  return (
    <Card>
      <Grid container alignItems="center" space="1">
        <Grid item container xs="6">
          <Avatar src={logo}></Avatar>
          <Grid>{data && <Grid item>{data.displayName}</Grid>}</Grid>
        </Grid>
        <Grid></Grid>

        {data ? (
          <Button color="primary" variant="contained" size="large">
            Disconnect
          </Button>
        ) : (
          <Button color="primary" variant="contained" size="large">
            Connect
          </Button>
        )}
      </Grid>
    </Card>
  );
};

export default LinkGoogleAccount;
