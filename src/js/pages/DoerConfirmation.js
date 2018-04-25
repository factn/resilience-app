/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faCloudUploadAlt } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
/*** [end of imports] ***/

export default class DoerConfirmation extends Component {
  render() {
    let confirmationPhotoInputObj = {
      labelPhrase: "Upload",
      labelIcon: faCloudUploadAlt,
      inputID: "photo",
      requiredField: true,
      disabledField: false
    }

    return (
      <div className="page flow-page doer-confirmation-page">
        <Header />
        <Main>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Jobs I want to do</h3>
            </header>
            <article className="card trending-card">
              <h4 className="card-title">Select from trending jobs</h4>
              <ul className="tag-list">
                <li className="tag inactive-tag">#Painting</li>
                <li className="tag active-tag">#Roofing</li>
                <li className="tag inactive-tag">#Transport</li>
                <li className="tag inactive-tag">#Coding</li>
                <li className="tag inactive-tag">#FirstAid</li>
                <li className="tag inactive-tag">#Childcare</li>
              </ul>
            </article>
          </section>
        </Main>
        <Footer>
          <Link to="/feed/doer" className="btn footer-btn feed-btn">
            Send Confirmation
          </Link>
        </Footer>
      </div>
    )
  }
}
