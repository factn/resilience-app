/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Local JS Utilities
import Database from "../resources/Database"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class Notification extends Component {
  state = {
    scenarioData: null
  }

  componentDidMount = () => {
    const id = this.props.childId

    if (id && !this.state.scenarioData) {
      Database.getScenario({ id })
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
    } else {
      if (scenarioData) {
        const { verb, noun } = scenarioData.attributes
        return `/${parentId}/requester/confirmation/${verb}/${noun}`
      }
    }
    return "/"
  }

  render() {
    const { doerName, avatar, open, dismiss } = this.props

    return (
      <section className={open ? "notification open" : "notification"}>
        <div className="notification-content">
          <div className="notification-avatar-wrap">
            <div
              className="notification-avatar"
              style={{
                backgroundImage: `url("${avatar || genericAvatar}")`
              }}
            />
          </div>
          <div className="notification-message">{doerName || "A worker bee"} has finished one of their tasks.</div>
        </div>
        <div className="button-row">
          <button className="btn dismiss-btn" onClick={() => dismiss()}>
            Dismiss
          </button>
          
          <Link className="btn view-btn" to={this.buildLink()}>
            Vouch for their work
          </Link>
        </div>
      </section>
    )
  }
}
