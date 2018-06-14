/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Cookies from "js-cookie"

// Page wrapper
import Page from "./Page"

// Page elements
import SessionSetting from "../components/SessionSetting"
import SessionCard from "../components/SessionCard"

// Inputs
import Image from "../components/inputs/Image"
import TextArea from "../components/inputs/TextArea"
import Submit from "../components/inputs/Submit"
import Location from "../components/inputs/Location"
import Select from "../components/inputs/Select"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64, toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class RequesterFlow extends Component {
  state = {
    scenarioId: this.props.match.params.scenarioId || 1,
    scenarioData: null,
    eventData: [],
    nounData: [],
    verbData: [],
    defaultEvent: "Hurricane Katrina",
    defaultNoun: "roof",
    defaultVerb: "fix",
    completeChildren: 0
  }

  componentDidMount = () => {
    this.setScenarioData()
    this.setEventData()
    this.setNounData()
    this.setVerbData()
  }
  setScenarioData = () => {
    Database.getScenario({ id: this.state.scenarioId })
      .then(result => {
        const { defaultEvent, nounEvent, verbEvent } = this.state
        const { data } = result.body

        // console.info("Database call complete:", data)

        this.setState({
          scenarioData: data,
          defaultEvent: data.attributes.event || defaultEvent,
          nounEvent: data.attributes.noun || nounEvent,
          verbEvent: data.attributes.verb || verbEvent
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          scenarioData: null
        })
      })
  }
  setEventData = () => {
    Database.getEvents()
      .then(result => {
        const { data } = result.body
        // console.info("Events call complete:", data)
        this.setState({
          eventData: data
        })
      })
      .catch(error => {
        // console.error("Error getting events:", error)
        this.setState({
          eventData: []
        })
      })
  }
  setNounData = () => {
    Database.getNouns()
      .then(result => {
        const { data } = result.body
        // console.info("Nouns call complete:", data)

        this.setState({
          nounData: data
        })
      })
      .catch(error => {
        // console.error("Error getting nouns:", error)
        this.setState({
          nounData: []
        })
      })
  }
  setVerbData = () => {
    Database.getVerbs()
      .then(result => {
        const { data } = result.body
        // console.info("Verbs call complete:", data)

        this.setState({
          verbData: data
        })
      })
      .catch(error => {
        // console.error("Error getting verbs:", error)
        this.setState({
          verbData: []
        })
      })
  }

  submitRequest = params => {
    const imageString = getBase64(params.image)

    const json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "300",
          image: imageString,
          custom_message: params.custom_message || ""
        },
        relationships: {
          event: {
            data: {
              type: "events",
              id: "2" // "Hurricane Katrina", or title field based off of `params.event`
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "5" // "roof", will be based of of title field
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "5" // "fix", will be based of of title field
            }
          },
          requester: {
            data: {
              type: "users",
              id: Cookies.get("userId") || "1"
              // update lat and long from params.lat and params.lon
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        const { data } = result.body
        // console.log("Scenario successfully created:", data)

        this.props.history.push(`/${data.id}/requester`)
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }

  render() {
    const {
      defaultEvent,
      defaultNoun,
      defaultVerb,
      eventData
      // nounData,
      // verbData
    } = this.state

    let eventSelectObj = {
      options: eventData,
      preselectedOption: defaultEvent,
      inputID: "event"
    }
    let nounVerbSelectObj = {
      options: [],
      preselectedOption: `${toFirstCap(defaultVerb)} my ${defaultNoun} $300`,
      inputID: "noun_and_verb"
    }
    let buttonObj = {
      labelPhrase: "Send for help",
      clas: "footer-btn feed-btn",
      onSubmit: this.submitRequest,
      onSubmitParams: {
        event: "event",
        photo: "photo",
        requesterlat: "requestLocation_lat",
        requesterlon: "requestLocation_lon",
        custom_message: "description"
      }
    }
    let textareaObj = {
      inputID: "description"
    }

    const footer = (
      <Fragment>
        <div className="button-label">Post your request</div>
        <Submit {...buttonObj} />
      </Fragment>
    )

    return (
      <Page className="flow-page requester-flow-page" footer={footer}>
        <SessionSetting headerLabel="Event">
          <SessionCard className="input-card event-card">
            <Select {...eventSelectObj} />
          </SessionCard>
        </SessionSetting>

        <SessionSetting headerLabel="What help do you need?">
          <SessionCard className="input-card title-card">
            <Select {...nounVerbSelectObj} />
          </SessionCard>
          <SessionCard className="input-card message-card">
            <TextArea {...textareaObj} />
          </SessionCard>
        </SessionSetting>

        <SessionSetting headerLabel="Where is it?">
          <SessionCard>
            <Location inputID="requestLocation" />
          </SessionCard>
        </SessionSetting>

        <SessionSetting headerLabel="Add a photo">
          <Image />
        </SessionSetting>
      </Page>
    )
  }
}
