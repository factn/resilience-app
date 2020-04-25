import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import { Body1 } from "../../../component";
import AddressInput from "../../../component/AddressInput";
import { StyledHeader, useStyles } from "./foodboxSteps.style";
import NavigationButtons from "./NavigationButtons";

function DeliveryStep({ handleChange, onBack, onNext, values }) {
  const classes = useStyles();

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
        onChange={handleChange}
        value={values.phone || ""}
        variant="outlined"
      />
      <FormControlLabel
        className={classes.checkBox}
        control={
          <Checkbox
            checked={values.cannotReceiveTexts}
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
            checked={values.termsAndConditions}
            onChange={handleCheckBoxChange}
            name="termsAndConditions"
          />
        }
        label="By signing up, I agree to some terms and conditions, waiver link here,"
      />

      <NavigationButtons onBack={onBack} onNext={onNext} />
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
