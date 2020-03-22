/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Logo image
import logo from "../../img/logo.svg"

import FormInput from '../components/FormInput'
import Form from '../components/Form'
/*** [end of imports] ***/

export default class RequestCreate extends Component {
  render() {

    return (
      <Page className="request-create-page">
          <div className="request-create-main">
              <Form>
              <div className="text-large">what help do you need ?</div>
              <div className="text-small">Describe the task</div>

              <FormInput inputObj={{
                      labelPhrase: 'Short Description'
              }}/>


              <FormInput inputObj={{
                      inputType: 'textarea',
                      labelPhrase: 'Task Details'
              }}/>

              <div className="text-large">How Much Can You Pay</div>
              <FormInput inputObj={{
                      labelPhrase: 'Dollar Amount'
              }}/>

          <div className="text-large">Where Do You Need Help</div>
              <FormInput inputObj={{
                      labelPhrase: 'postal code'
              }}/>

          <div className="text-large">Add A Photo</div>
          <div className="text-small">Help volunteers better understand what you need help with
</div>
                <FormInput inputObj={{
                      inputType: 'image'
              }}/>
              <FormInput inputObj={{
                      inputType: 'submit'
              }}/>
              </Form>
          </div>
      </Page>
    )
  }
}
