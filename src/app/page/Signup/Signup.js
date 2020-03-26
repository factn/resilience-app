import React, { useState } from "react";
import { Row, Col } from "react-flexbox-grid";

import { Page } from "../../layout";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { FormWrapper, HeaderText, DescriptionText, PaddedDiv } from "./Signup.style";

const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    zipCode: "",
    errors: "",
  });

  const handleLoginCTAClick = (e) => {
    e.preventDefault();

    window.location = "/login";
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submit form and redirect user");
    let newState = {};

    for (let field in form) {
      if (!form.field) newState[field] = "REQUIRED";
    }

    setForm(newState);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Page>
      <FormWrapper>
        <HeaderText>Create account</HeaderText>
        <DescriptionText>Create an account to post your request</DescriptionText>
        <form onSubmit={(e) => handleFormSubmit(e)}>
          <Row>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="fullName"
                  inputName="fullName"
                  label="FULL NAME"
                  placeholder={form["fullName"]}
                  value={form["fullName"]}
                  onChange={(e) => handleChange(e)}
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
                  placeholder={form["email"]}
                  value={form["email"]}
                  onChange={(e) => handleChange(e)}
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
                  placeholder={form["phoneNumber"]}
                  value={form["phoneNumber"]}
                  onChange={(e) => handleChange(e)}
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
                  placeholder={form["zipCode"]}
                  value={form["zipCode"]}
                  onChange={(e) => handleChange(e)}
                />
              </PaddedDiv>
            </Col>
          </Row>
          <Row>
            <Col xsOffset={2} xs={4} mdOffset={3} md={3}>
              <Button text="Log in" onClick={(e) => handleLoginCTAClick(e)} tertiary />
            </Col>
            <Col xs={6}>
              <Button
                text="Create account"
                // onClick={() => handleFormSubmit()}
                secondary
                size="lg"
              />
            </Col>
          </Row>
        </form>
      </FormWrapper>
    </Page>
  );
};

export default SignupPage;
