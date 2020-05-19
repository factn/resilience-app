import { Checkbox, FormControlLabel, TextField, Box, Grid } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { H2, H4, Body1 } from "../../../component";
import AddressAutocomplete from "../../../component/AddressAutocomplete";
import {
  useStyles,
  CurbsideDetailsPaper,
  DeliveryCautionPaper,
  GridIconStyled,
} from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import { useOrganization } from "../../../model";
import SignupStep from "./SignUpStep";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Map, Marker, TileLayer } from "react-leaflet";

function DeliveryStep({ dispatch, state }) {
  const classes = useStyles();
  const profile = useSelector((state) => state.firebase.profile);
  const org = useOrganization();
  const [validate, setValidate] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  async function submit() {
    setValidate(true);

    if (!state.details.location) {
      if (state.details.curbsidePickup) {
        dispatch({ type: "UPDATE_DETAILS", payload: { location: org.location, instructions: "" } });
      } else {
        dispatch({ type: "ERROR", payload: "Please fill out the required fields" });
        return;
      }
    }

    console.log(profile);

    if (profile.isEmpty || !profile.phoneNumber) {
      setShowSignup(true);
      return;
    }

    const { displayName, phoneNumber, uid } = profile;
    dispatch({ type: "UPDATE_USER", payload: { uid, displayName, phoneNumber } });

    dispatch({ type: "NEXT" });
  }

  if (showSignup) {
    return <SignupStep onBack={() => setShowSignup(false)} dispatch={dispatch} />;
  }

  return (
    <div>
      <Body1 className={classes.body1}>
        We offer curbside pick up on Sunday mornings. If you are unable to pick up, volunteers carry
        out deliveries once a week on weekends.
      </Body1>
      <H2 align="left" color="textPrimary" gutterBottom>
        Delivery / Pick Up Details
      </H2>
      <FormControlLabel
        className={classes.checkBox}
        control={
          <Checkbox
            color="primary"
            checked={state.details.curbsidePickup}
            onChange={(e) => {
              const checked = e.target.checked;
              dispatch({ type: "UPDATE_DETAILS", payload: { curbsidePickup: checked } });
            }}
            name="curbsidePickup"
          />
        }
        label="I can pick up from curbside location"
      />
      {state.details.curbsidePickup ? (
        <>
          <CurbsideDetailsPaper elevation={0}>
            <Grid container spacing={2} direction="column">
              <Grid item container spacing={1} wrap="nowrap">
                <GridIconStyled item>
                  <LocationOnIcon />
                </GridIconStyled>
                <Grid item>
                  <H4>Pick Up Location:</H4>
                  <Body1>{org.location.label}</Body1>
                  <Body1>{org.location.address}</Body1>
                </Grid>
              </Grid>

              <Grid item container spacing={1} wrap="nowrap">
                <GridIconStyled item>
                  <AccessTime />
                </GridIconStyled>
                <Grid item>
                  <H4>Pick Up Time:</H4>
                  <Body1>Sunday morning between 8:00am–11:00am</Body1>
                </Grid>
              </Grid>
            </Grid>
          </CurbsideDetailsPaper>
          <Box height="200px">
            <Map center={org.location} zoom={16} style={{ width: "100%", height: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={org.location} />
            </Map>
          </Box>
        </>
      ) : (
        <>
          <AddressAutocomplete
            label="Location"
            defaultLocation={org.location ? org.location : state.details.location}
            onChangeLocation={(location) =>
              dispatch({ type: "UPDATE_DETAILS", payload: { location } })
            }
            showMap={true}
            error={validate && !state.details.location}
            required
          />
          <TextField
            className={classes.textArea}
            fullWidth
            helperText="By default we leave food boxes at your door"
            label="Drop off Instructions / Comments"
            multiline
            name="instructions"
            onChange={(e) =>
              dispatch({ type: "UPDATE_DETAILS", payload: { instructions: e.target.value } })
            }
            placeholder="Knock loudly, leave in front, etc."
            rows={5}
            value={state.details.instructions}
            variant="outlined"
          />
          <DeliveryCautionPaper elevation={0}>
            <Grid container spacing={2} direction="column">
              <Grid item container spacing={1} wrap="nowrap">
                <GridIconStyled item>
                  <LocationOnIcon />
                </GridIconStyled>
                <Grid item>
                  <Box paddingBottom="16px">
                    <Body1>
                      Please note that our delivery service is a pilot program and should only be
                      used for <b>extreme cases</b>, such as for the immunocompromised, as our
                      volunteer services are limited.
                    </Body1>
                  </Box>
                  <Body1>
                    <b>
                      Delivery is currently only available to those in Studio City at this time.
                    </b>
                    This covers South of the 101 Freeway, West of Lankershim Blvd., East of Fulton
                    Ave. and North of Mulholland.
                  </Body1>
                </Grid>
              </Grid>
            </Grid>
          </DeliveryCautionPaper>
        </>
      )}

      <NavigationButtons
        onBack={() => dispatch({ type: "BACK" })}
        nextText="continue"
        onNext={submit}
      />
    </div>
  );
}

export default DeliveryStep;
