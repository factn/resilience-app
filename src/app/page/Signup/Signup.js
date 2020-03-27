import React from "react";
import { Row, Col } from "react-flexbox-grid";

import { Page } from "../../layout";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { FormWrapper, HeaderText, DescriptionText, PaddedDiv } from "./Signup.style";
import useForm from "../../hooks/useForm";

const SignupPage = (props) => {
  const { handleChange, values, setValues } = useForm({
    fullName: "",
    email: "",
    phoneNumber: "",
    zipCode: "",
    errors: "",
  });

  const handleLoginCTAClick = (e) => {
    e.preventDefault();
    props.history.push("/login");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Submit form and redirect user");
    let newState = {};

    for (let field in values) {
      if (!values.field) newState[field] = "REQUIRED";
    }

    setValues(newState);
  };

  return (
    <Page>
      <FormWrapper>
        <HeaderText>Create account</HeaderText>
        <DescriptionText>Create an account to post your request</DescriptionText>
        <form onSubmit={handleFormSubmit}>
          <Row>
            <Col xs={12}>
              <PaddedDiv>
                <Input
                  inputType="text"
                  dataId="fullName"
                  inputName="fullName"
                  label="FULL NAME"
                  placeholder={values.fullName}
                  value={values.fullName}
                  onChange={handleChange}
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
                  placeholder={values.email}
                  value={values.email}
                  onChange={handleChange}
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
                  placeholder={values.phoneNumber}
                  value={values.phoneNumber}
                  onChange={handleChange}
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
                  placeholder={values.zipCode}
                  value={values.zipCode}
                  onChange={handleChange}
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
