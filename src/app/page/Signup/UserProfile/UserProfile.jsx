import React, { useState } from "react";

import { Page } from "../../../layout";
import { Body1 } from "../../../component"
import { useStyles, StyledHeader } from "./UserProfile.style";

import { FormControlLabel, TextField, Container, Checkbox } from "@material-ui/core";
import { AddressInput, Button } from "../../../component";

const convertFullName = (fullName) => {
  let firstName = ''
  let lastName = ''
  if (fullName) {
    const parts = fullName.split(' ')
    lastName = parts[parts.length - 1]
    if (parts.length > 1) {
      firstName = parts.slice(0, parts.length - 1)
    }
  }
  return [firstName, lastName]
};


/**
 * Component for signing up users
 *
 * @component
 */
const UserProfile = ({ values, handleChange, onSubmit }) => {
  const classes = useStyles()
  const [locationValue, setLocation] = useState(null);

  function handleSubmit() {
    onSubmit(locationValue)
  }

  function changeFormValue(name, value) {
    handleChange({ target: { name, value}})
  }

  function handleCheckBoxChange(event, value) {
    changeFormValue(event.currentTarget.name, value)
  }

  console.log(values)

  const [ firstName, lastName ] = convertFullName(values.fullName)
  return (
    <Page>
      <Container classes={{ root: classes.root }}>
        <StyledHeader main align="center" variant="h1">
          Welcome!
        </StyledHeader>
        <StyledHeader main align="center" variant="h3">
          Volunteer Registration
        </StyledHeader>
        <Body1 className={classes.body1}>
          Tells us more about so we can match you with missions.
        </Body1>
        <TextField
          className={classes.textField}
          defaultValue={firstName}
          fullWidth={true}
          label="First Name"
          name="firstName"
          onChange={handleChange}
          value={values.firstName}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          defaultValue={lastName}
          fullWidth={true}
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          value={values.lastName}
          variant="outlined"
        />
        <div className={classes.textField}>
          <AddressInput
            className={classes.textField}
            placeholder="Pickup location"
            stage={locationValue}
            setStage={setLocation}
          />
        </div>
        <TextField
          className={classes.textField}
          fullWidth={true}
          variant="outlined"
          value={values.phone || ''}
          name="phone"
          onChange={handleChange}
          label="Phone Number"
          helperText="Used for receiving mission updates (SMS/texts)"
        />

        <TextField
          className={classes.textField}
          fullWidth={true}
          variant="outlined"
          value={values.availability}
          name="availability"
          onChange={handleChange}
          label="Est. Hours available per week"
          helperText="Your availability"
        />

        <TextField
          className={classes.textField}
          fullWidth={true}
          helperText="Describe your top 2 skills that could be useful for us to know to match you with missions"
          label="Tell us a bit about yourself"
          multiline
          name="description"
          onChange={handleChange}
          value={values.description || ''}
          variant="outlined"
        />
        <FormControlLabel
          className={classes.checkBox}
          control={
            <Checkbox
              checked={values.hasTransportation}
              onChange={handleCheckBoxChange}
              name="hasTransportation"
            />
          }
          label="I have a vehicle that can be used for deliveries."
        />

        <Body1 className={classes.body2}>
          Once an organizer approves your registration, you can start taking on missions!
        </Body1>

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
        <Button
          className={classes.button}
          disabled={!values.termsAndConditions}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
    </Page>
  );
};

export default UserProfile;
