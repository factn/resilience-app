import React from "react";

import { Page } from "../../../layout";
import { Body1 } from "../../../component"
import { useStyles, StyledHeader } from "./UserProfile.style";
import { TextField, Container } from "@material-ui/core";

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
}


/**
 * Component for signing up users
 *
 * @component
 */
const UserProfile = ({ values, handleChange, onSubmit }) => {
  const classes = useStyles()
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
          fullWidth={true}
          variant="outlined"
          value={firstName}
          name="firstName"
          onChange={handleChange}
          label="First Name"
        />
        <TextField
          className={classes.textField}
          fullWidth={true}
          variant="outlined"
          value={lastName}
          name="lastName"
          onChange={handleChange}
          label="Last Name"
        />
        <TextField
          className={classes.textField}
          fullWidth={true}
          variant="outlined"
          value={lastName}
          name="location"
          onChange={handleChange}
          label="Location"
        />

        <TextField
          className={classes.textField}
          fullWidth={true}
          variant="outlined"
          value={values.phone}
          name="phoneNumber"
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
          variant="outlined"
          value={values.description}
          name="availability"
          onChange={handleChange}
          label="Tell us a bit about yourself"
          helperText="Describe your top 2 skills that could be useful for us to know to match you with missions"
        />

          {/* <Col xs={12}>
            <PaddedDiv>
              <Input
                dataId="fullName"
                handleChange={handleChange}
                inputName="fullName"
                inputType="text"
                label="FULL NAME"
                value={values.fullName}
              />
            </PaddedDiv>
          </Col>
          <Col xs={12}>
            <PaddedDiv>
              <Input
                dataId="email"
                inputName="email"
                inputType="text"
                label="EMAIL"
                value={values.email}
              />
            </PaddedDiv>
          </Col>
          <Col xs={12}>
            <PaddedDiv>
              <Input
                // dataId="phoneNumber"
                inputName="phoneNumber"
                inputType="text"
                label="PHONE NUMBER"
                value={values.phoneNumber}
              />
            </PaddedDiv>
          </Col>
          <Col xs={12}>
            <PaddedDiv>
              <Input inputType="text" dataId="zipCode" inputName="zipCode" label="ZIP CODE" />
            </PaddedDiv>
          </Col> */}
        {/* <Row>
          <Col xsOffset={2} xs={4} mdOffset={3} md={3}>
            <Button text="Log in" onClick={(e) => handleLoginCTAClick(e)} tertiary />
          </Col>
          <Col xs={6}>
            <Button
              text="Create account"
              onClick={onSubmit}
              secondary
              size="lg"
            />
          </Col>
        </Row> */}
      </Container>
    </Page>
  );
};

export default UserProfile;
