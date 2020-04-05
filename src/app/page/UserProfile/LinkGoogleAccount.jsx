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

const LinkGoogleAccount = ({ data, provider, auth, errorHandler }) => {
  const classes = useStyles();
  async function onLinkClick() {
    try {
      const credential = await auth.currentUser.linkWithPopup(provider).then(/* redirect */);
    } catch (error) {
      errorHandler(error);
    }
  }
  async function onUnlinkClick() {
    try {
      await auth.currentUser.unlink(data.providerId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Card>
      <Grid container alignItems="center" space="1">
        <Grid item container xs={6}>
          <Avatar src={logo}></Avatar>
          <Grid>{data && <Grid item>{data.displayName}</Grid>}</Grid>
        </Grid>
        <Grid></Grid>

        {data ? (
          <Button color="primary" variant="contained" size="large" onClick={onUnlinkClick}>
            Disconnect
          </Button>
        ) : (
          <Button color="primary" variant="contained" size="large" onClick={onLinkClick}>
            Connect
          </Button>
        )}
      </Grid>
    </Card>
  );
};

export default LinkGoogleAccount;
