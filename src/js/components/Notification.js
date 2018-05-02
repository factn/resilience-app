/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Notification extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null
    }
  }

  getScenarioData = () => {
    const { id } = this.props
    if (id) {
      Database.getScenario({ id })
        .then(result => {
          const { data } = result.body
          console.info("Success getting scenario:", data)

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
  }
  buildLink = () => {
    const { toLink, id } = this.props
    const { scenarioData } = this.state

    if (toLink) {
      return toLink
    } else if (!toLink && scenarioData) {
      return `/${id}/doer/confirmation/${scenarioData.attributes.verb}/${
        scenarioData.attributes.noun
      }`
    }
    return "/"
  }
  buildScenario = () => {
    if (this.state.scenarioData) {
      const { doer_firstname, noun, verb } = this.state.scenarioData.attributes

      return (
        <div className="notification-content">
          Can you verify that {toFirstCap(doer_firstname)} {verb}ed {noun}
        </div>
      )
    } else {
      return <span />
    }
  }

  render() {
    const { open, dismissal, id } = this.props

    // default to link will eventually go to confirm mission complete page from LION-86

    if (id && !this.state.scenarioData) {
      this.getScenarioData()
    }

    return (
      <section className={open ? "notification open" : "notification"}>
        {id && this.buildScenario()}
        <div className="button-row">
          <Link className="btn view-btn" to={() => this.buildLink()}>
            View
          </Link>
          <button className="btn dismiss-btn" onClick={() => dismissal()}>
            Dismiss
          </button>
        </div>
      </section>
    )
  }
}
