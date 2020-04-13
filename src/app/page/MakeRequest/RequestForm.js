import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { TextField, Typography, Select, FormControl } from "@material-ui/core";
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
  const [addressInput, setAddressInput] = React.useState("");
  const [photo, setPhoto] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [fundStatus, setFundStatus] = React.useState(null);

  const handleSubmit = () => {
    const payload = {
      deliveryLocation: location ? location : addressInput,
      fundStatus,
    };
    onSubmit(payload);
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
          <StyledSpan onClick={() => setErrorFindLocation(true)}>Insert manually.</StyledSpan>
        </p>
        {errorFindLocation && (
          <Container>
            <TextField
              variant="outlined"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              label="Describe your location"
              helperText="handle as much details as possible"
            />
          </Container>
        )}
        <StyledHeader align="left" variant="h2">
          Details
        </StyledHeader>
        <TextField
          m={2}
          fullWidth={true}
          variant="outlined"
          value={values.title || ""}
          name="title"
          onChange={handleChange}
          label="Title / Subject"
          required={true}
        />
        <TextField
          fullWidth={true}
          variant="outlined"
          value={values.description || ""}
          name="description"
          multiline={true}
          rows={4}
          onChange={handleChange}
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
        <Container>
          <FormControl>
            <Select
              fullWidth={true}
              native
              id="funded-type"
              labelId="funded-label"
              value={fundStatus}
              onChange={(e) => setFundStatus(e.target.value)}
            >
              <option value="none">Set how the cost will be paid...</option>
              <option value="fundedinkind">I want to receive a donation</option>
              <option value="fundedbyrecipient">I want to pay</option>
            </Select>
          </FormControl>
        </Container>
        <Button
          onClick={handleSubmit}
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
