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

const ChoosePhoto = ({ classes, profile, displayName, src }) => {
  var [defaultPreview, setDefaultPreview] = useState("defaultPreview");
  var [preview, setPreview] = useState("preview");
  var [view, setView] = useState("view");

  function onCropDefault(preview) {
    console.log("on crop default");
    console.log(preview);
    setDefaultPreview(preview)
  }

  function onCrop(preview) {
    console.log("on crop:");
    console.log(preview);
    setPreview(preview)
  }

  function onCloseDefault() {
    setDefaultPreview(null)
  }

  function onClose() {
    setPreview(null)
  }

  function setEdit(e) {
    e.preventDefault();
    setView("edit");
  }

  function cancelAction(e) {
    e.preventDefault();
    //setProfile(_.cloneDeep(firebaseProfile));
    setView("view");
  }

  function saveAction(e) {
    e.preventDefault();
    //firebase.updateProfile(profile);
    setView("view");
  }

  return view === 'edit' ? (
    <Grid spacing={2} justify="center" container>
        <Grid item>
        <PhotoSelection
          width={390}
          height={295}
          onCrop={onCropDefault}
          onClose={onCloseDefault}
          // src={state.src}
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
      <Avatar className={classes.profileImage} src={profile.photoURL} alt={displayName} />
      <Link onClick={setEdit}>Change Photo</Link>
    </Grid>
  );
};
export default ChoosePhoto;
