import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//import Input from "../../component/Input";
import AlgoliaPlaces from "algolia-places-react";
import { TextField, Typography } from "@material-ui/core";
import Button from "../../component/Button";
import { Header, Container, SubText, Upload } from "./Request.style";
import { Page } from "../../layout";

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

  const handleLocation = (query) => {
    if (query.suggestion) {
      setErrorFindLocation(false);
      const { value, latlng, county, countryCode } = query.suggestion;
      setLocation({
        ...location,
        location: {
          label: value,
          lat: latlng.lat,
          lng: latlng.lng,
          county,
          countryCode,
        },
      });
    } else {
      setErrorFindLocation(true);
    }
  };

  const handleSubmit = (location) => {
    onSubmit(location);
  };

  return (
    <Page>
      <Container>
        <StyledHeader>Where do you need help?</StyledHeader>
        <AlgoliaPlaces
          placeholder="Enter your Address"
          name="location"
          options={{
            appId: "plZ318O8ODTC",
            apiKey: "b5e0781d289a9aa8edb37bf24aef874e",
            language: "en",
            countries: ["us"],
            type: "city",
            // Other options from https://community.algolia.com/places/documentation.html#options
          }}
          onChange={(query) => handleLocation(query, "dropOff")}
          onLimit={({ message }) => console.log("Fired when you reached your current rate limit.")}
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
