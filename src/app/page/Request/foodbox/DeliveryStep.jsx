import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import AddressInput from "../../../component/AddressInput";
import { useFirebase } from "react-redux-firebase";
import { normalizeLocation } from "../../../utils/helpers";
import { StyledHeader, useStyles } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";
import { User } from "../../../model";

function DeliveryStep({
  handleChange,
  onBack,
  onNext,
  setErrorSnackbarMessage,
  setLoading,
  values,
}) {
  const classes = useStyles();
  const firebase = useFirebase();

  function changeFormValue(name, value) {
    handleChange({ target: { name, value } });
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
        setErrorSnackbarMessage(error);
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
      setLoading(true);
      User.saveNewUser(data).then(() => {
        setLoading(false);
        onNext();
      });
    } catch (error) {
      setLoading(false);
      setErrorSnackbarMessage(error);
    }
  }

  function handleSubmitUser() {
    if (values.cannotReceiveTexts) {
      updateUserProfile();
    } else {
      verifyPhone();
    }
  }

  return (
    <div>
      <Body1 className={classes.body1}>
        Our volunteers will carry out deliveries once a week on weekends. The organizer will contact
        you to confirm date of delivery.
      </Body1>
      <StyledHeader main align="left" variant="h2">
        Delivery Drop Off Details
      </StyledHeader>
      <AddressInput
        className={classes.textField}
        placeholder="Location"
        stage={values.location}
        setStage={handleChangeLocation}
      />
      <TextField
        className={classes.textArea}
        fullWidth
        helperText="By default we leave food boxes at your door"
        label="Drop off Instructions / Comments"
        multiline
        name="description"
        onChange={handleChange}
        placeholder="Knock loudly, leave in front, etc."
        rows={5}
        value={values.description || ""}
        variant="outlined"
      />
      <Body1 className={classes.body1}>
        To help our volunteers fulfill your request, please provide your name and contact mobile
        number.
      </Body1>
      <StyledHeader main align="left" variant="h2">
        Your Account
      </StyledHeader>
      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        onChange={handleChange}
        value={values.firstName || ""}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        value={values.lastName || ""}
        variant="outlined"
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

      <NavigationButtons onBack={onBack} onNext={handleSubmitUser} />
    </div>
  );
}

DeliveryStep.propTypes = {
  handleChange: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default DeliveryStep;
