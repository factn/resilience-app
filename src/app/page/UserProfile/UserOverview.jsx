import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _ from "lodash";
import React, { useEffect } from "react";

import { H5 } from "../../component";
import { useScript } from "../../hooks";
import ProfileImage from "./ProfileImage";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
  },
  profileImage: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "12px auto 8px auto",
  },
  profileEditButton: {
    backgroundColor: "transparent",
    color: theme.color.darkBlue,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.color.secondaryBlue,
    },
  },
}));

const UserStatus = ({ profile, setProfile, view }) => {
  const classes = useStyles();
  const [loaded, error] = useScript(
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_ACCESS_TOKEN}&libraries=places`
  );

  let autocomplete;

  const displayName = _.get(profile, "displayName", "");
  const address = _.get(profile, "address", "");

  function updateProfile(e) {
    e.preventDefault();
    profile[e.target.id] = e.target.value;
    setProfile(_.cloneDeep(profile));
  }

  const handleAddressSelect = () => {
    const addrObj = autocomplete.getPlace();
    const addr = addrObj.formatted_address;

    if (addr) {
      profile["address"] = addr;
      setProfile(_.cloneDeep(profile));
    }
  };

  const handleScriptLoad = () => {
    const options = {
      type: ["(cities)"],
    };
    const addrElem = document.getElementById("address");

    if (window.google) {
      autocomplete = new window.google.maps.places.Autocomplete(addrElem, options);
      autocomplete.setFields(["address_components", "formatted_address"]);
      autocomplete.addListener("place_changed", handleAddressSelect);
    }
  };

  useEffect(() => {
    if (loaded && !error) {
      handleScriptLoad();
    }
  }, [loaded, error]);

  return (
    <Grid container direction="column" justify="center" className={classes.root} spacing={2}>
      <ProfileImage classes={classes} profile={profile} setProfile={setProfile} />
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
          <H5>Location</H5>
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
export default UserStatus;
