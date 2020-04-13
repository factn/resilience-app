import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Page, Card } from "../../layout";
import { Button } from "../../component";
import ErrorSnackbar from "../../component/Snackbars/ErrorSnackbar";
import { Grid, Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import PhotoSelection from './photoselection.jsx'

import { useFirebase, useFirestore } from "react-redux-firebase";
import _ from "lodash";

/**
 * Return the component displaying the profile image and enabling the ability to
 * change it.
 * @param {hook} classes - A hook passed by the caller meant to help
 *                         with styling.
 * @param {object} profile - A reference to the session profile
 * @param {func} setProfile - A function that can set the profile object. 
 * @return {Component} the component for displaying and editing the profile image
 */
const ProfileImage = ({ classes, profile, setProfile }) => {
  const firebase = useFirebase();
  const firestore = useFirestore();
  const firebaseProfile = useSelector((state) => state.firebase.profile);

  const displayName = _.get(profile, "displayName", "");
  const profilePhoto = _.get(profile, "photoURL", "");

  var [defaultPreview, setDefaultPreview] = useState("defaultPreview");
  var [view, setView] = useState("view");

  function onCropDefault(preview) {
    console.log("on crop default called.");
    profile["photoURL"] = preview;
    setProfile(_.cloneDeep(profile));
    setDefaultPreview(preview)
  }

  function onCloseDefault() {
    setDefaultPreview(null)
  }

  function setEdit(e) {
    e.preventDefault();
    setView("edit");
  }

  function cancelAction(e) {
    e.preventDefault();
    setProfile(_.cloneDeep(firebaseProfile));
    setView("view");
  }

  function saveAction(e) {
    e.preventDefault();
    firebase.updateProfile(profile);
    setView("view");
  }

  return view === 'edit' ? (
    <Grid spacing={2} justify="center" container>
        <Grid item>
        <PhotoSelection
          width={390}
          height={295}
          selectAction={onCropDefault}
        />
        </Grid>
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
      </Grid>
  ) : (
    <Grid item>
      <Avatar className={classes.profileImage} src={profilePhoto} alt={displayName} />
      <Link style={{ textDecoration: 'none' }} onClick={setEdit}><h4>Change Picture</h4></Link>
    </Grid>
  );
};
export default ProfileImage;
