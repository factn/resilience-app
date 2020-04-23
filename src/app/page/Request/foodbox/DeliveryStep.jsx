import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Checkbox, Container, FormControlLabel, TextField } from "@material-ui/core";

import { ReactComponent as HappyFace } from "../../../../img/happy-face.svg";
import { useStyles, StyledHeader, HR, TotalsContainer, HappyBox } from "./foodboxSteps.style";
import AddressInput from "../../../component/AddressInput";
import { Body1 } from "../../../component";
import Select from "@material-ui/core/Select";

import NavigationButtons from "./NavigationButtons";

function DeliveryStep({ onBack, onNext, handleChange, values }) {
  const history = useHistory();
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
        fullWidth={true}
        helperText="By default we leave food boxes at your door"
        label="Drop off Instructions / Comments"
        placeholder="Knock loudly, leave in front, etc."
        multiline
        rows={5}
        name="description"
        onChange={handleChange}
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
        // className={classes.textField}
        fullWidth={true}
        label="First Name"
        name="firstName"
        onChange={handleChange}
        value={values.firstName}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth={true}
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        value={values.lastName}
        variant="outlined"
      />
      <TextField
        className={classes.textField}
        fullWidth={true}
        variant="outlined"
        value={values.phone || ""}
        name="phone"
        onChange={handleChange}
        label="Mobile Number"
        helperText="Used for receiving updates (SMS/texts)"
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

      <NavigationButtons
        backText="Cancel"
        onBack={() => history.push("/request")}
        onNext={onNext}
      />
    </div>
  );
}

export default DeliveryStep;
