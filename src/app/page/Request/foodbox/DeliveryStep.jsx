import { Checkbox, FormControlLabel, TextField, Box } from "@material-ui/core";
import { AccessTime } from "@material-ui/icons";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import { H2, H4, Body1 } from "../../../component";
import AddressAutocomplete from "../../../component/AddressAutocomplete";
import { useStyles, PaperStyled } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import { useOrganization } from "../../../model";
import SignupStep from "./SignUpStep";

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
      <AddressAutocomplete
        label="Location"
        disabled={state.details.curbsidePickup}
        defaultLocation={state.details.curbsidePickup ? org.location : state.details.location}
        onChangeLocation={(location) => dispatch({ type: "UPDATE_DETAILS", payload: { location } })}
        showMap={true}
        error={validate && !state.details.location}
        required
      />

      {state.details.curbsidePickup ? (
        <PaperStyled>
          <AccessTime />
          <Box textAlign="left" marginLeft="1rem">
            <H4>Pick Up Time:</H4>
            <Body1>Sunday morning between</Body1>
            <Body1>8:00am–11:00am</Body1>
          </Box>
        </PaperStyled>
      ) : (
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
