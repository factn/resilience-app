/*** IMPORTS ***/
// Module imports
import React from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faHome } from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
import Main from "../components/Main"
/*** [end of imports] ***/

const NoPage = () => (
  <Page clas="no-page-404">
    <Main>
      <div className="custom-content">
        <h2>There's nothing here!</h2>
        <p>The page you are trying to reach does not exist.</p>
      </div>
      <Link to="/" className="btn submit-btn neutral-response">
        <span className="button-label">Go Home </span>
        <Icon icon={faHome} className="button-icon" />
      </Link>
    </Main>
  </Page>
)

export default NoPage
