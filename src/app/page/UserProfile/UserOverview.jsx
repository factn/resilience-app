import React, { useEffect } from "react";
import { H5 } from "../../component";
import { Grid, Avatar, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import addressLookUp from "../../utils/addressLookUp";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { withFirestore } from "react-redux-firebase";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  profileImage: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "12px auto 8px auto",
  },
}));

const UserStatus = ({ view, profile, setProfile, firestore }) => {
  const classes = useStyles();
  // find the user
  const user = useSelector((state) => state.firebase.auth);

  const displayName = _.get(profile, "displayName", "");
  const address = _.get(profile, "address", "");

  useEffect(() => {
    const userId = user.uid;
    if (address) {
      const location = addressLookUp(address);
      location
        .then((res) => firestore.collection("users").doc(userId).set({ location: res }))
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  function updateProfile(e) {
    e.preventDefault();
    profile[e.target.id] = e.target.value;
    setProfile(_.cloneDeep(profile));
  }
  return (
    <Grid container direction="column" justify="center" className={classes.root} spacing={2}>
      <Avatar className={classes.profileImage} src={profile.photoURL} alt={displayName} />
      <Grid item container spacing={1} direction="column">
        <Grid item container>
          <H5>Displayname</H5>
        </Grid>
        <Grid item>
          <TextField
            className={`${classes.rootInput} ${classes.input}`}
            id="displayName"
            value={displayName}
            placeholder="your name..."
            variant="outlined"
            disabled={view === "view"}
            onChange={updateProfile}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid item container spacing={1} direction="column">
        <Grid item container>
          <H5>Address</H5>
        </Grid>
        <Grid item>
          <TextField
            id="address"
            value={address}
            placeholder="your address..."
            variant="outlined"
            disabled={view === "view"}
            onChange={updateProfile}
            fullWidth
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default withFirestore(UserStatus);
