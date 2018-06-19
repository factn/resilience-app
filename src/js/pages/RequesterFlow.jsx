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
    userId: Cookies.get("userId") || "1",
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
        const { event, noun, verb } = data.attributes

        this.setState({
          scenarioData: data,
          defaultEvent: event || defaultEvent,
          nounEvent: noun || nounEvent,
          verbEvent: verb || verbEvent
        })
      })
      .catch(error => {
        this.setState({
          scenarioData: null
        })
      })
  }
  setEventData = () => {
    Database.getEvents()
      .then(result => {
        this.setState({
          eventData: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          eventData: []
        })
      })
  }
  setNounData = () => {
    Database.getNouns()
      .then(result => {
        this.setState({
          nounData: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          nounData: []
        })
      })
  }
  setVerbData = () => {
    Database.getVerbs()
      .then(result => {
        this.setState({
          verbData: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          verbData: []
        })
      })
  }

  submitRequest = params => {
    const { userId } = this.state
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
              id: userId || "1"
              // update lat and long from params.lat and params.lon
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        this.props.history.push(`/${result.body.data.id}/requester`)
      })
      .catch(error => {})
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
