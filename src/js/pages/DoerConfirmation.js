/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Input
import Image from "../components/inputs/Image"
/*** [end of imports] ***/

export default class DoerConfirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remainingCharacterCount: 512
    }
  }

  updateCharacterCount = e => {
    const { value } = e.target

    this.setState({
      remainingCharacterCount: 512 - value.length
    })
  }

  render() {
    const { remainingCharacterCount } = this.state

    return (
      <Page clas="flow-page doer-flow-page">
        <Main>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Add a photo</h3>
            </header>
            <Image />
          </section>
          <section className="session-settings">
            <header className="settings-header">
              <h3>Include a message</h3>
            </header>
            <article className="card input-card message-card">
              <textarea
                placeholder="Add a message"
                maxLength="512"
                rows="3"
                onChange={e => this.updateCharacterCount(e)}
              />
              <div className="remaining-character-count">
                {remainingCharacterCount} characters left
              </div>
            </article>
          </section>
        </Main>

        <Footer>
          <Link to="/feed/doer" className="btn footer-btn feed-btn">
            Send Confirmation
          </Link>
        </Footer>
      </Page>
    )
  }
}
