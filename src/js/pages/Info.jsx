/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { invalidateRequests } from "redux-bees"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck, faMapMarkerAlt, faEdit, faClock, faDollarSign } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"

// Local JS Utilities
import Database from "../resources/Database"
import { toFirstCap, moneyfy } from "../resources/Util"

// Images
import genericAvatar from "../../img/fb-profile.jpg"
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Info extends Component {
  state = {
    scenarioId: this.props.match.params.scenario_id || 1,
    role: this.props.match.params.role || "info",
    scenarioData: null,
    childrenScenarioData: null,
    requesterData: null,
    buttonOverride: false,
    materialsDone: null,
    transportDone: null,
    roofCovered: null,
    roofSecured: null,
    notificationScenarioId: null,
    notificationOpen: false,
    dataRefreshRate: 5000 // Every 5 seconds check for map pin changes
  }

  componentDidMount = () => {
    Database.getScenarioWithChildren({ id: this.state.scenarioId })
      .then(result => {
        const { data, included } = result.body
        // console.info("Success getting scenario:", data, included)

        this.setState({
          scenarioData: data,
          childrenScenarioData: included
        })

        this.mountRequesterData(this.state.scenarioId)
        this.createRefresh()

        invalidateRequests(Database.getScenarioWithChildren)
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)

        this.setState({
          scenarioData: null,
          childrenScenarioData: null
        })
      })
  }

  componentWillUnmount = () => {
    clearInterval(this.autoRefresh)
  }

  createRefresh = () => {
    const { dataRefreshRate, scenarioId } = this.state

    this.autoRefresh = setInterval(() => {
      Database.getScenarioWithChildren({ id: scenarioId })
        .then(result => {
          const { data, included } = result.body
          // console.info("Success getting scenario:", data, included)

          this.setState({
            scenarioData: data,
            childrenScenarioData: included
          })

          invalidateRequests(Database.getScenarioWithChildren)
        })
        .catch(error => {
          // console.error("Error getting scenarios:", error)

          this.setState({
            scenarioData: null,
            childrenScenarioData: null
          })
        })
    }, dataRefreshRate)
  }

  mountRequesterData = id => {
    Database.getScenarioRequester({ id })
      .then(result => {
        const { included } = result.body
        // console.info("Success getting scenario requester:", included)

        this.setState({
          requesterData: included[0]
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)

        this.setState({
          requesterData: null
        })
      })
  }

  dismissNotification = () => {
    this.setState({
      notificationOpen: false
    })
  }

  render() {
    const { scenarioData, requesterData } = this.state

    if (scenarioData && requesterData) {
      const { scenarioId, role, notificationOpen, notificationScenarioId } = this.state

      const {
        event,
        image,
        requester_firstname,
        requester_lastname,
        noun,
        verb,
        custom_message,
        funding_goal
      } = scenarioData.attributes

      const { avatar } = requesterData.attributes

      const notificationProps = {
        notification: true,
        notificationOpen,
        parentScenarioId: scenarioId,
        childScenarioId: notificationScenarioId,
        dismissNotification: this.dismissNotification
      }

      const footer = (
        <div className="scenario-footer-wrap">
          <div className="scenario-cost scenario-footer-flex-item">
            <Icon icon={faDollarSign} className="scenario-cost-icon" />
            <div className="scenario-item-text">
              <div className="scenario-item-label">Cost:</div>
              <div className="scenario-item-value">{moneyfy(funding_goal)}</div>
            </div>
          </div>
          <div className="scenario-time scenario-footer-flex-item">
            <Icon icon={faClock} className="scenario-time-icon" />
            <div className="scenario-item-text">
              <div className="scenario-item-label">Time left:</div>
              <div className="scenario-item-value">48:00 hrs</div>
            </div>
          </div>
        </div>
      )

      return (
        <Page className="info-page" {...notificationProps} footer={footer}>
          <figure className="scenario-content-image-wrap">
            <img src={image} alt={event} className="scenario-content-image" />
          </figure>

          <header className="scenario-content-header">
            <h4 className="scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</h4>
          </header>

          <section className="scenario-content-body">
            <div className="mission-status-header">
              <span className="mission-status-label">Mission Status: </span>
              <span className="mission-status">Looking for Workers</span>
            </div>

            <div className="scenario-action-buttons">
              <div className="edit-mission-btn">
                <Icon icon={faEdit} className="action-button-icon" />
                <span className="action-button-label">Edit mission</span>
              </div>
              <div className="workers-btn">
                <img src={logo} className="action-button-image" alt="Workers" />
                <span className="action-button-label">1 Worker</span>
              </div>
            </div>

            <div className="user-info">
              <div className="user-avatar-wrap">
                <div
                  className="user-avatar"
                  style={{
                    backgroundImage: `url("${avatar || genericAvatar}")`
                  }}
                />
              </div>

              <div className="scenario-user">
                <div className="user-name">
                  {toFirstCap(requester_firstname)} {toFirstCap(requester_lastname)}
                </div>
                <div className="user-vouched-status">
                  <Icon icon={faCheck} />
                </div>
              </div>

              <div className="scenario-location">
                <div className="location-name">Pearlington, Louisiana</div>
                <div className="location-icon">
                  <Icon icon={faMapMarkerAlt} />
                </div>
              </div>
            </div>

            <div className="scenario-description">
              {custom_message ||
                "My roof was damaged in Hurricane Katrina. I need your help to cover it. Can have more info here to help tell the story and convince people to do this."}
            </div>

            <section className="scenario-tags">
              <div className="scenario-event-location tag">{event}</div>
              <ul className="tag-list">
                <li className="tag inactive-tag">#Driving</li>
                <li className="tag inactive-tag">#Logistics</li>
                <li className="tag inactive-tag">#Roofing</li>
              </ul>
            </section>
          </section>
        </Page>
      )
    } else {
      return (
        <Page>
          <Loader />
        </Page>
      )
    }
  }
}
