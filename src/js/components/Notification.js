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
    const { childId } = this.props

    if (childId) {
      Database.getScenario({ id: childId })
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
  }
  buildLink = () => {
    const { toLink, parentId } = this.props
    const { scenarioData } = this.state

    if (toLink) {
      return toLink
    } else if (!toLink && scenarioData) {
      return `/${parentId}/requester/confirmation/${
        scenarioData.attributes.verb
      }/${scenarioData.attributes.noun}`
    }
    return "/"
  }

  render() {
    const { open, dismissal, childId } = this.props

    // default to link will eventually go to confirm mission complete page from LION-86

    if (childId && !this.state.scenarioData) {
      this.getScenarioData()
    }

    return (
      <section className={open ? "notification open" : "notification"}>
        <div className="notification-content">
          Work has been done on your project! Can you help us verify it's been
          done correctly?
        </div>
        <div className="button-row">
          <Link className="btn view-btn" to={this.buildLink()}>
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
