import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextField, Typography } from "@material-ui/core";
import Button from "../../component/Button";
import { Container, SubText, Upload } from "./Request.style";
import { Page } from "../../layout";
import AddressInput from "../../component/AddressInput";

const StyledHeader = styled(Typography)`
  margin-top: 0.8vh;
  padding: 1.2vh 0;
  margin-bottom: 0.45vh;
  margin-left: 10%;
  text-transform: none;
`;

const StyledSpan = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

function RequestForm({ handleChange, values, onSubmit, getFile }) {
  const [errorFindLocation, setErrorFindLocation] = React.useState(false);
  const [photo, setPhoto] = React.useState(false);
  const [location, setLocation] = React.useState({});

  const handleSubmit = (location) => {
    onSubmit(location);
  };

  return (
    <Page>
      <Container>
        <StyledHeader>Where do you need help?</StyledHeader>
        <AddressInput
          placeholder="Enter your Address"
          stage={location}
          setStage={setLocation}
          name="location"
        />
        <p>
          Can't find it?
          <StyledSpan onClick={() => setErrorFindLocation(true)}>
            Enter your postal code.
          </StyledSpan>
        </p>
        {errorFindLocation && (
          <Container>
            <TextField
              variant="outlined"
              value={values.postalCode || ""}
              name="postalCode"
              onChange={handleChange}
              label="Postal Code"
              helperText="Help us to find your location"
            />
          </Container>
        )}
        <StyledHeader align="left" variant="h2">
          Details
        </StyledHeader>
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.description || ""}
          name="description"
          multiline={true}
          rows={4}
          onChange={handleSubmit}
          label="Information notes for volunteers"
        />
        <StyledHeader
          align="left"
          variant="h2"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={() => setPhoto(!photo)}
        >
          Add a photo
        </StyledHeader>
        {photo && (
          <>
            {" "}
            <SubText>Help volunteers better understand what you need</SubText>
            <Upload getFile={getFile} values={values} />
          </>
        )}
        <Button
          onClick={onSubmit}
          secondary
          text="Make Request"
          style={{ width: "90%", margin: "2.3vh 0" }}
        />
      </Container>
    </Page>
  );
}

RequestForm.propTypes = {
  handleChange: PropTypes.func,
  value: PropTypes.object,
  onSubmit: PropTypes.func,
  getFile: PropTypes.func,
};

export default RequestForm;
