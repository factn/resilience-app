/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Components
import Stars from "./Stars"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class MissionComplete extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null
    }
  }

  getScenarioData = () => {
    const { parentId } = this.props

    Database.getScenario({ id: parentId })
      .then(result => {
        const { data } = result.body
        // console.info("Success getting scenario:", data)

        this.setState({
          scenarioData: data
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          scenarioData: null
        })
      })
  }

  render() {
    const { open, dismiss } = this.props
    console.log(this.state.scenarioData)

    return (
      <section
        className={
          open
            ? "modal mission-complete-modal open"
            : "modal mission-complete-modal"
        }
        onClick={() => dismiss()}
      >
        <Stars />
        <h2>We did it!</h2>
        <h3>You just made a huge difference</h3>
        <div className="social-share-area">
          <div className="social-share-label">Tell your friends:</div>
          <div className="add-this-wrap">
            <div className="addthis_inline_share_toolbox" />
          </div>
        </div>
        <button className="btn-lite dismiss-btn" onClick={() => dismiss()}>
          Dismiss
        </button>
      </section>
    )
  }
}
