import {
  Checkbox,
  FormControlLabel,
  TextField,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import React from "react";
import { Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

import { Body1 } from "../../../component";
import AddressInput from "../../../component/AddressInput";
import { useFirebase } from "react-redux-firebase";
import { normalizeLocation } from "../../../utils/helpers";
import { useStyles } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import { User } from "../../../model";
import { useForm } from "../../../hooks";

function DeliveryStep({ dispatch, state }) {
  const classes = useStyles();
  const auth = useSelector((state) => state.firebase.auth);
  const firebase = useFirebase();
  const { handleChange, values } = useForm();

  function changeFormValue(name, value) {
    handleChange({ target: { name, value } });
    return value;
  }

  function handleCheckBoxChange(event, value) {
    changeFormValue(event.currentTarget.name, value);
  }

  function handleChangeLocation(data) {
    const { location } = data;
    changeFormValue("location", location);
  }

  async function verifyPhone() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("phone", {
        size: "invisible",
      });
    }
    const verificationPrompt =
      "Please enter the verification code that was sent to your mobile device.";

    firebase
      .auth()
      .signInWithPhoneNumber(values.phone, window.recaptchaVerifier)
      .then(async function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        const verificationCode = window.prompt(verificationPrompt);
        confirmationResult.confirm(verificationCode).then((response) => {
          updateUserProfile({
            ...getPayload(),
            id: response.user.id,
          });
        });
      })
      .catch(function (error) {
        dispatch({ type: "ERROR", payload: error });
      });
  }

  function getPayload() {
    const payload = {
      displayName: `${values.firstName} ${values.lastName}`,
      phone: values.phone || "",
      cannotReceiveTexts: !!values.cannotReceiveTexts,
    };
    if (values.location) payload.location = normalizeLocation(values.location);
    return payload;
  }

  function updateUserProfile(data = getPayload()) {
    try {
      dispatch({ type: "LOADING", payload: true });
      User.saveNewUser(data).then(() => {
        dispatch({ type: "NEXT" });
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error });
    }
  }

  function validate() {
    let hasError = false;
    hasError = changeFormValue("locationError", !values.location);
    hasError = changeFormValue("firstNameError", !values.firstName) || hasError;
    hasError = changeFormValue("lastNameError", !values.lastName) || hasError;
    hasError = changeFormValue("phoneError", !values.phone) || hasError;
    hasError = changeFormValue("tcError", !values.termsAndConditions) || hasError;
    return hasError;
  }

  function submit() {
    if (validate()) {
      dispatch({ type: "ERROR", payload: "Please fill out the required fields" });
      return;
    }
  }

  function handleSubmitUser() {
    // TODO validate input before actually running this
    if (auth.isEmpty) {
      if (values.cannotReceiveTexts) {
        updateUserProfile();
      } else {
        console.log("hello");
        verifyPhone();
      }
      return;
    }
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { location: values.location, instructions: values.instructions },
    });
  }

  return (
    <div>
      <Body1 className={classes.body1}>
        Our volunteers will carry out deliveries once a week on weekends. The organizer will contact
        you to confirm date of delivery.
      </Body1>
      <Typography align="left" variant="h2" color="textPrimary" gutterBottom>
        Delivery Drop Off Details
      </Typography>
      <AddressInput
        className={classes.textField}
        placeholder="Location"
        stage={values.location}
        setStage={handleChangeLocation}
        error={values.locationError}
        onClear={() => changeFormValue("location", undefined)}
      />
      <TextField
        className={classes.textArea}
        fullWidth
        helperText="By default we leave food boxes at your door"
        label="Drop off Instructions / Comments"
        multiline
        name="instructions"
        onChange={handleChange}
        placeholder="Knock loudly, leave in front, etc."
        rows={5}
        value={values.instructions || ""}
        variant="outlined"
      />
      <Body1 className={classes.body1}>
        To help our volunteers fulfill your request, please provide your name and contact mobile
        number.
      </Body1>
      {auth.isEmpty ||
        (true && (
          <>
            <Typography align="left" variant="h2" color="textPrimary" gutterBottom>
              Your Account
            </Typography>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              onChange={handleChange}
              value={values.firstName || ""}
              variant="outlined"
              required
              error={values.firstNameError}
            />
            <TextField
              className={classes.textField}
              fullWidth
              label="Last Name"
              name="lastName"
              onChange={handleChange}
              value={values.lastName || ""}
              variant="outlined"
              required
              error={values.lastNameError}
            />
            <TextField
              className={classes.textField}
              fullWidth
              helperText="Used for receiving updates (SMS/texts)"
              label="Mobile Number"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={values.phone || ""}
              variant="outlined"
              required
              error={values.phoneError}
            />
            <FormControlLabel
              className={classes.checkBox}
              control={
                <Checkbox
                  checked={!!values.cannotReceiveTexts}
                  onChange={handleCheckBoxChange}
                  name="cannotReceiveTexts"
                />
              }
              label="I cannot receive SMS/texts"
            />
            <FormControl required error={values.tcError}>
              {values.tcError && <FormHelperText>Below checkbox is required</FormHelperText>}
              <FormControlLabel
                className={classes.checkBox}
                control={
                  <Checkbox
                    checked={!!values.termsAndConditions}
                    onChange={handleCheckBoxChange}
                    name="termsAndConditions"
                  />
                }
                label="By signing up, I agree to some terms and conditions, waiver link here,"
              />
            </FormControl>
          </>
        ))}

      <NavigationButtons onBack={() => dispatch({ type: "BACK" })} onNext={submit} />
    </div>
  );
}

export default DeliveryStep;
