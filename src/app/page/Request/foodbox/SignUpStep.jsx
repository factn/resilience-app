import React from "react";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";
import { TextField, FormControl, FormControlLabel, Checkbox } from "@material-ui/core";

import { useStyles } from "./foodboxSteps.style";
import { H2, Body1 } from "../../../component";
import { useForm } from "../../../hooks";
import NavigationButtons from "./NavigationButtons";
import { User } from "../../../model";

export default function SignUpStep({ dispatch, onBack }) {
  const classes = useStyles();
  const profile = useSelector((state) => state.firebase.profile);
  const { handleChange, values } = useForm();
  const firebase = useFirebase();

  async function verifyPhone() {
    let userUid;
    const { cannotReceiveTexts, displayName, phoneNumber } = values;

    try {
      if (cannotReceiveTexts) {
        // This user is created but not connected to any login.
        userUid = await User.createProfile(null, {
          displayName,
          phoneNumber,
          cannotReceiveTexts: true,
        });
      } else {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("phone-number", {
            size: "invisible",
          });
        }

        const verificationPrompt =
          "Please enter the verification code that was sent to your mobile device.";

        let confirmationResult;
        if (profile.isEmpty) {
          confirmationResult = await firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
        } else {
          confirmationResult = await firebase
            .auth()
            .currentUser.linkWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
        }

        const verificationCode = window.prompt(verificationPrompt);
        const response = await confirmationResult.confirm(verificationCode);

        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
        }

        userUid = response.user.uid;
        await User.createProfile(userUid, {
          displayName,
          phoneNumber,
          cannotReceiveTexts,
        });
      }

      dispatch({
        type: "UPDATE_USER",
        payload: { uid: userUid, phoneNumber, displayName },
      });
      dispatch({ type: "NEXT" });
    } catch (error) {
      const message =
        error.message === "Invalid format."
          ? 'Phone number provided is invalid format. Please use "+15555555555".'
          : error.message;
      dispatch({ type: "ERROR", payload: message });
    }
  }

  function validateForm() {
    let hasError = false;
    hasError = !values.displayName;
    hasError = !values.phoneNumber;

    handleChange({ target: { name: "validate", value: true } });
    return hasError;
  }

  function submit() {
    if (validateForm()) {
      dispatch({ type: "ERROR", payload: "Please fill out the required fields" });
      return;
    }
    verifyPhone();
  }

  return (
    <>
      <Body1>Please add your name and phone number to create an account.</Body1>
      <H2 align="left" color="textPrimary" gutterBottom>
        Your Account
      </H2>
      <TextField
        fullWidth
        label="Full Name"
        name="displayName"
        onChange={handleChange}
        value={values.displayName || ""}
        variant="outlined"
        required
        error={values.validate && !values.displayName}
      />
      <TextField
        className={classes.textField}
        placeholder="+15555555555"
        fullWidth
        helperText="Used for receiving updates (SMS/texts)"
        label="Mobile Number"
        name="phoneNumber"
        id="phone-number"
        onChange={handleChange}
        value={values.phoneNumber || ""}
        variant="outlined"
        required
        error={values.validate && !values.phoneNumber}
      />
      <FormControl className={classes.formControl}>
        <FormControlLabel
          className={classes.checkBox}
          control={
            <Checkbox
              color="primary"
              checked={values.cannotReceiveTexts}
              onChange={(e) =>
                handleChange({ target: { value: e.target.checked, name: e.target.name } })
              }
              name="cannotReceiveTexts"
            />
          }
          label="I cannot receive SMS/texts"
        />
      </FormControl>
      <NavigationButtons onBack={onBack} nextText="Sign Up" onNext={submit} />
    </>
  );
}
