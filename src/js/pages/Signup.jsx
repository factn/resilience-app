import React, { useState } from "react"
import Form from "../components/Form"
import TextInput from "../components/inputs/Text"
import Submit from "../components/inputs/Submit"
import logo from "../../img/logo1.png"

function SignUp({ history }) {
  const [values, setValues] = useState({})

  function handleChange({ target }) {
    setValues({ ...values, [target.name]: target.value })
  }

  function sumbitSignup(e) {
    // action happen here
  }

  const buttonObj = {
    labelPhrase: "Create account",
    clas: "footer-btn signup-btn spaced",
    onSubmit: sumbitSignup,
    onSubmitParams: {
      fullname: "fullname",
      email: "email",
      password: "phoneNumber"
    }
  }
  const loginObj = {
    labelPhrase: "Log in",
    clas: "login-btn",
    onSubmit: () => history.push("/login"),
    onSubmitParams: {
      fullname: "fullname",
      email: "email",
      password: "phoneNumber"
    }
  }

  return (
    <div>
      <div className="sign-form">
        <Form>
          <img className="logo" src={logo} alt="logo" width="80" />
          <TextInput
            onChange={handleChange}
            name="fullname"
            labelPhrase="FULL NAME"
            inputID="fullname"
            inputType="text"
            required
          />
          <TextInput
            onChange={handleChange}
            name="email"
            labelPhrase="EMAIL"
            inputID="email"
            inputType="email"
            required
          />

          <TextInput
            className="input-grid"
            onChange={handleChange}
            name="phoneNumber"
            labelPhrase="PHONE NUMBER"
            inputID="phoneNumber"
            inputType="number"
            required
          />
          <TextInput
            className="input-grid"
            onChange={handleChange}
            name="zipCode"
            labelPhrase="ZIP CODE"
            inputID="zipCode"
            inputType="number"
            required
          />

          <div className="group-btn">
            <Submit {...loginObj} />
            <Submit {...buttonObj} />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
