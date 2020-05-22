import { Avatar, Grid } from "@material-ui/core";
import _ from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { Link } from "react-router-dom";

import { Button } from "../../component";
import PhotoSelection from "./photoselection.jsx";
import { H4 } from "../../component/Typography";

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
  const firebaseProfile = useSelector((state) => state.firebase.profile);

  const displayName = profile.displayName || "";
  const profilePhoto = profile.photoURL || "";

  const [view, setView] = useState("view");

  function onCropDefault(preview) {
    profile["photoURL"] = preview;
    //setProfile(_.cloneDeep(profile));
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

  return view === "edit" ? (
    <Grid spacing={2} justify="center" container>
      <Grid item>
        <PhotoSelection width={390} height={295} selectAction={onCropDefault} profile={profile} />
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
      <Link style={{ textDecoration: "none" }} onClick={setEdit}>
        <H4 align="center">Change Picture</H4>
      </Link>
    </Grid>
  );
};
export default ProfileImage;
