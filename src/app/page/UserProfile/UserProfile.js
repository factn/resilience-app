import React from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Page, Card } from "../../layout";
import { Chip, Button, H5 } from "../../component";
import { Typography, Grid, Input } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Avatar, CardContent } from "@material-ui/core";

import { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  useFirebase,
  useFirebaseConnect,
  useFirestore,
  isLoaded,
  isEmpty,
} from "react-redux-firebase";
import _ from "lodash";

import LinkGoogleAccount from "./LinkGoogleAccount";
import LinkPhoneAccount from "./LinkPhoneAccount";

import UserOverview from "./UserOverview";
import UserStatus from "./UserStatus";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(1),
  },
  fullWidth: {
    width: "100%",
  },
}));

//TODO authorization query please
async function getData(fs, authId) {
  let missionsCreated = {};
  let missionsVolunteered = {};
  let user = {};
  const missionsCreatedData = fs.collection("missions").where("ownerId", "==", authId).get();
  const missionsVolunteeredData = fs
    .collection("missions")
    .where("volunteerId", "==", authId)
    .get();
  const userData = fs.collection("users").doc(authId).get();

  const values = await Promise.all([missionsCreatedData, missionsVolunteeredData, userData]);

  values[0].forEach((doc) => {
    missionsCreated[doc.id] = doc.data();
  });
  values[1].forEach((doc) => {
    missionsVolunteered[doc.id] = doc.data();
  });
  user = values[2].data();
  return {
    missionsCreated,
    missionsVolunteered,
    user,
  };
}

const UserProfile = ({ history, ...props }) => {
  const classes = useStyles();
  const firebase = useFirebase();
  const firestore = useFirestore();

  const profile = useSelector((state) => state.firebase.profile);
  const status = profile.status;
  const location = profile.location;

  const user = useSelector((state) => state.firebase.auth);
  const auth = firebase.auth();

  // === User status === //
  function setStatus(status) {
    firebase.updateProfile({ status: status });
  }
  function setLocation(location) {}
  function onLocationInputKeyEnter(event) {
    //   if (event.key === "Enter") {
    //     event.preventDefault();
    //     firebase.updateProfile({ location: });
    //   }
  }

  // === GOOGLE === //
  const googleProviderData = _.find(user.providerData, (data) => {
    return data.providerId === "google.com";
  });
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  // === PHONE === //
  const phoneProviderData = _.find(user.providerData, (data) => {
    return data.providerId === "phone";
  });

  // === Error handler ===
  // We use this in case the linking went wrong, possibly handle the..
  // error, for example, to merge data

  async function errorHandler(error) {
    // we need to merge data with this error
    if (error.code === "auth/credential-already-in-use") {
      var prevUser = auth.currentUser;
      var pendingCred = error.credential;
      var prevUserData = await getData(firestore, prevUser.uid);
      prevUser.delete();

      try {
        var result = await auth.signInWithCredential(error.credential);
        var currentUser = result.user;
        var currentUserData = await getData(firestore, result.user.uid);

        const mergeData = _.merge(prevUserData, currentUserData);

        const linkResult = prevUser.linkedWithCredential(result.credential);
        const signInResult = await auth.signInWithCredential(linkResult.credential);

        firestore.collection("users").doc(signInResult.user.id).set(mergeData);
      } catch (e) {
        firestore.collection("users").doc(prevUser.uid).set(prevUserData);
        firestore.collection("users").doc(currentUser.uid).set(currentUserData);
      }

      return;
    }
    throw error;
  }

  return (
    <Page template="white" title="Profile" spacing={3}>
      <Card>
        <UserOverview photoUrl={user.photoURL} displayName={user.displayName} />
      </Card>

      <Card>
        <Grid container direction="column" alignItems="flex-start" spacing={1}>
          <UserStatus status={status} setStatus={setStatus} />

          <Grid item>
            <Typography variant="h5">Phone Number</Typography>
          </Grid>
          <Grid item>
            <LinkPhoneAccount data={phoneProviderData} auth={auth} errorHandler={errorHandler} />
          </Grid>

          <Grid item>
            <Typography variant="h5">Location</Typography>
          </Grid>
          <Grid item>
            {profile.isLoaded && (
              <Input
                defaultValue={location}
                label="your address..."
                onKeyPress={onLocationInputKeyEnter}
                onChange={setLocation}
              />
            )}
          </Grid>
          <Grid item className={classes.fullWidth}>
            <Button size="large" className={classes.fullWidth}>
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <LinkGoogleAccount
          data={googleProviderData}
          provider={googleAuthProvider}
          auth={auth}
          errorHandler={errorHandler}
        />
      </Card>
    </Page>
  );
};

UserProfile.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(UserProfile);
