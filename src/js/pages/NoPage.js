/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/fontawesome-free-solid"

// Components
import Header from "../components/Header"
import Main from "../components/Main"
import Form from "../components/Form"
/*** [end of imports] ***/

export default class NoPage extends Component {
  render() {
    return (
      <div className="page no-page-404">
        <Header />
        <Main>
          <Form>
            <div className="input-wrap">
              <div className="custom-content">
                <h2>There's nothing here!</h2>
                <p>The page you are trying to reach does not exist.</p>
              </div>
            </div>
            <Link className="btn submit-btn neutral-response" to="/">
              <span className="button-label">Go Home </span>
              <Icon icon={faHome} className="button-icon" />
            </Link>
          </Form>
        </Main>
      </div>
    )
  }
}
