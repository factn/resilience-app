import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { withRouter } from "react-router-dom";

import User from "../../model/User";
import { Button } from "../../component";
import { ErrorSnackbar, SuccessSnackbar } from "../../component/Snackbars";
import { Card, Page } from "../../layout";
import addressLookUp from "../../utils/addressLookUp";
import LinkGoogleAccount from "./LinkGoogleAccount";
import LinkPhoneAccount from "./LinkPhoneAccount";
import UserOverview from "./UserOverview";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: theme.spacing(1),
  },
  fullWidth: {
    width: "100%",
  },
  linkedAccountContainer: {
    paddingTop: theme.spacing(2),
  },
}));

const ProfileControlButtons = ({ cancelAction, editAction, isEdit, saveAction }) => {
  return isEdit ? (
    <Grid spacing={2} justify="center" container>
      <Grid item>
        <Button size="large" onClick={saveAction}>
          Save
        </Button>
      </Grid>
      <Grid item>
        <Button size="large" onClick={cancelAction}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Button size="large" onClick={editAction}>
      Edit Profile
    </Button>
  );
};

/**
 * Component used for showing user profile
 * NOTE:  This is the old component, not sure if we still want to use this
 *
 * @component
 */
const UserProfile = () => {
  const classes = useStyles();
  const firebase = useFirebase();

  /*===SETUP Profile Control===*/
  const firebaseAuth = useSelector((state) => state.firebase.auth);
  const firebaseProfile = useSelector((state) => state.firebase.profile);
  const [profile, setProfile] = useState(_.cloneDeep(firebaseProfile));
  var [view, setView] = useState("view");
  const isEdit = view !== "view";
  function editProfileAction(e) {
    e.preventDefault();
    setView("edit");
  }
  function cancelProfileAction(e) {
    e.preventDefault();
    setProfile(_.cloneDeep(firebaseProfile));
    setView("view");
  }
  async function saveProfileAction(e) {
    e.preventDefault();

    let location = profile?.location;
    try {
      if (location.address) {
        const data = await addressLookUp(location.address);
        location = { ...location, lat: data.lat, lng: data.long };
      }
    } catch (error) {
      console.log("ERROR WHEN GETTiNG LOCATION", error);
      console.log("address: ", location.address);
    }
    setSuccessSnackbarOpen(true);
    User.update(firebaseAuth.uid, { ...profile, location });

    setView("view");
  }
  /*
  Basically if this is a user that have signup using facebook or google, the auth in firebase would be populate with info to which-
  we update the profile into the actual profile instead
  */
  useEffect(() => {
    if (firebaseAuth.isLoaded && firebaseProfile.isLoaded && firebaseProfile.isEmpty) {
      User.update(firebaseAuth.uid, firebaseAuth);
    }
    // eslint-disable-next-line
  }, [firebaseAuth, firebaseProfile]);

  /*
  firebase profile need to load in and then we update it in state
  */
  useEffect(() => {
    if (firebaseProfile.isLoaded && !firebaseProfile.isEmpty) {
      setProfile(_.cloneDeep(firebaseProfile));
    }
  }, [firebaseProfile]);
  /*===END Profile Control===*/

  /*===SETUP Linking Control===*/
  const user = useSelector((state) => state.firebase.auth);
  const auth = firebase.auth();
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const captchaVerifier = firebase.auth.RecaptchaVerifier;

  /* === Linked Account Control === */
  const googleProviderData = _.find(user.providerData, (data) => {
    return data.providerId === "google.com";
  });

  // === PHONE === //
  const phoneProviderData = _.find(user.providerData, (data) => {
    return data.providerId === "phone";
  });

  /*=== Snack Bar - Success Message ===*/
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  // === Error Messages ==== //
  const [notSupportedError, setNotSupportedError] = useState(false);

  // === Error handler ===
  // We use this in case the linking went wrong, possibly handle the..
  // error, for example, to merge data

  async function errorHandler(error) {
    if (["auth/credential-already-in-use", "auth/email-already-in-use"].indexOf(error.code) > -1) {
      // check for './utils.js' if you want to work on the merge problem
      setNotSupportedError(true);
      return;
    }
    throw error;
  }
  /*===END Linking Control===*/

  const isLoading = !firebaseProfile.isLoaded || !user.isLoaded;
  // not used yet
  //<UserStatus status={status} setStatus={setStatus} />
  return (
    <Page template="white" title="Profile" spacing={3} isLoading={isLoading}>
      <ErrorSnackbar
        open={notSupportedError}
        errorMessage="We do not support linking with an already existed account. You can sigin to the other account if needed."
        handleClose={() => {
          setNotSupportedError(false);
        }}
        autoHideDuration={8000}
      />
      <SuccessSnackbar
        open={successSnackbarOpen}
        handleClose={() => {
          setSuccessSnackbarOpen(false);
        }}
        successMessage="Profile saved successfully."
        autoHideDuration={4000}
      />
      <Card>
        <UserOverview profile={profile} view={view} setView={setView} setProfile={setProfile} />
      </Card>
      <Grid item className={classes.fullWidth}>
        <ProfileControlButtons
          isEdit={isEdit}
          saveAction={saveProfileAction}
          cancelAction={cancelProfileAction}
          editAction={editProfileAction}
        />
      </Grid>
      <Card>
        <Grid container className={classes.linkedAccountContainer} spacing={3} direction="column">
          <LinkPhoneAccount
            firebase={firebase}
            data={phoneProviderData}
            auth={auth}
            errorHandler={errorHandler}
            captchaVerifier={captchaVerifier}
          />
          <LinkGoogleAccount
            data={googleProviderData}
            provider={googleProvider}
            auth={auth}
            errorHandler={errorHandler}
          />
        </Grid>
      </Card>
    </Page>
  );
};

UserProfile.propTypes = {
  /**
   * Navigation history provided by React Router
   */
  history: PropTypes.object.isRequired,
};

export default withRouter(UserProfile);
