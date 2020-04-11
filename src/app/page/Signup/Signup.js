import React, { useState } from "react";
import { Row, Col } from "react-flexbox-grid";

import { Page } from "../../layout";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { FormWrapper, HeaderText, DescriptionText, PaddedDiv } from "./Signup.style";

/**
 * Component for signing up users
 *
 * @component
 */
const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const handleLoginCTAClick = (e) => {
    e.preventDefault();

    window.location = "/login";
  };

  const handleOnChange = (setterFn) => (event) => setterFn(event.target.value);
  const handleFormSubmit = () => {
    console.log("Submit form and redirect user");
  };

  return (
    <Page>
      <FormWrapper>
        <HeaderText>Create account</HeaderText>
        <DescriptionText>Create an account to post your request</DescriptionText>
        <form onSubmit={() => handleFormSubmit()}>
          <Row>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="fullName"
                  inputName="fullName"
                  label="FULL NAME"
                  onChange={handleOnChange(setFullName)}
                  value={fullName}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="email"
                  inputName="email"
                  label="EMAIL"
                  onChange={handleOnChange(setEmail)}
                  value={email}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="phoneNumber"
                  inputName="phoneNumber"
                  label="PHONE NUMBER"
                  onChange={handleOnChange(setPhoneNumber)}
                  value={phoneNumber}
                />
              </PaddedDiv>
            </Col>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="zipCode"
                  inputName="zipCode"
                  label="ZIP CODE"
                  onChange={handleOnChange(setZipcode)}
                  value={zipcode}
                />
              </PaddedDiv>
            </Col>
          </Row>
          <Row>
            <Col xsOffset={2} xs={4} mdOffset={3} md={3}>
              <Button
                data-testid="btn-login"
                text="Log in"
                onClick={(e) => handleLoginCTAClick(e)}
                variant="outlined"
              />
            </Col>
            <Col xs={6}>
              <Button
                data-testid="btn-create-account"
                text="Create account"
                onClick={() => handleFormSubmit()}
                color="secondary"
                size="large"
              />
            </Col>
          </Row>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default SignupPage;
