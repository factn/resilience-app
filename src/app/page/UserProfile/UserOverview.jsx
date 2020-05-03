import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import React from "react";

import { H5 } from "../../component";
import ProfileImage from "./ProfileImage";
import AddressInput from "../../component/AddressInput";

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

const UserStatus = ({ profile, setProfile, view }) => {
  const classes = useStyles();

  const displayName = profile.displayName;

  function handleChangeLocation(location) {
    setProfile(_.cloneDeep({ ...profile, location }));
  }

  function updateProfile(e) {
    e.preventDefault();
    setProfile(_.cloneDeep(profile));
  }

  return (
    <Grid container direction="column" justify="center" className={classes.root} spacing={2}>
      <ProfileImage classes={classes} profile={profile} setProfile={setProfile} />
      <Grid item container spacing={1} direction="column">
        <Grid item container>
          <H5>Address</H5>
        </Grid>
        <AddressInput
          disabled={view === "view"}
          key={view}
          id="address"
          placeholder="Location"
          location={profile.location}
          setLocation={handleChangeLocation}
        />
      </Grid>

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
    </Grid>
  );
};
export default UserStatus;
