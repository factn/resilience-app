/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/fontawesome-free-solid"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionSetting from "../components/SessionSetting"

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

const history = createHistory()

export default class RequesterFlow extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
        // console.info("Nouns call complete:", result.body.data)
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
        // console.info("Verbs call complete:", result.body.data)
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
    let imageString = getBase64(params.image)

    let json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "1000",
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
        // console.log("Scenario successfully created:", result)
        this.createChildrenScenario({
          image: imageString,
          event: "2", // "Hurricane Katrina", or title field based off of `params.event`
          userId: Cookies.get("userId") || "1",
          lat: params.lat,
          lon: params.lon,
          parentScenarioId: result.body.data.id,
          address: params.address || "",
          custom_message: params.custom_message || ""
        })
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }
  createChildrenScenario = params => {
    // This should be rolled up into one endpoint
    this.createGetMaterialsScenario(params)
    this.createGetTransporationScenario(params)
    this.createPatchRoofScenario(params)
    this.createFixRoofScenario(params)

    let waitForChildren = setInterval(() => {
      if (this.state.completeChildren === 4) {
        clearInterval(waitForChildren)

        history.push(`/${params.parentScenarioId}/requester`)
        window.location = `/${params.parentScenarioId}/requester`
      }
    })
  }
  createGetMaterialsScenario = params => {
    const json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "0",
          image: params.image
        },
        relationships: {
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          },
          event: {
            data: {
              type: "events",
              id: params.event
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "7" // "materials"
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "1" // "get"
            }
          },
          requester: {
            data: {
              type: "users",
              id: params.userId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Scenario successfully created:", result)
        this.setState({
          completeChildren: this.state.completeChildren + 1
        })
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }
  createGetTransporationScenario = params => {
    const json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "0",
          image: params.image
        },
        relationships: {
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          },
          event: {
            data: {
              type: "events",
              id: params.event
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "19" // "transportation"
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "1" // "get"
            }
          },
          requester: {
            data: {
              type: "users",
              id: params.userId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Scenario successfully created:", result)
        this.setState({
          completeChildren: this.state.completeChildren + 1
        })
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }
  createPatchRoofScenario = params => {
    const json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "0",
          image: params.image
        },
        relationships: {
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          },
          event: {
            data: {
              type: "events",
              id: params.event
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "5" // "roof"
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "6" // "patch"
            }
          },
          requester: {
            data: {
              type: "users",
              id: params.userId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Scenario successfully created:", result)
        this.setState({
          completeChildren: this.state.completeChildren + 1
        })
      })
      .catch(error => {
        // console.error("Error creating scenario:", error)
      })
  }
  createFixRoofScenario = params => {
    const json = {
      // No where to put address info or custom message
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "0",
          image: params.image
        },
        relationships: {
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          },
          event: {
            data: {
              type: "events",
              id: params.event
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "5" // "roof"
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "5" // "fix"
            }
          },
          requester: {
            data: {
              type: "users",
              id: params.userId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Scenario successfully created:", result)
        this.setState({
          completeChildren: this.state.completeChildren + 1
        })
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
      eventData,
      nounData,
      verbData
    } = this.state

    let eventSelectObj = {
      options: eventData,
      preselectedOption: defaultEvent,
      inputID: "event"
    }
    let nounVerbSelectObj = {
      options: [],
      preselectedOption: `${toFirstCap(defaultVerb)} my ${defaultNoun}`,
      inputID: "noun_and_verb"
    }
    let buttonObj = {
      labelPhrase: "Submit",
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

    return (
      <Page clas="flow-page requester-flow-page">
        <Main>
          <SessionSetting headerLabel="Event">
            <article className="card input-card event-card">
              <Select {...eventSelectObj} />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="What help do you need?">
            <article className="card input-card title-card">
              <Select {...nounVerbSelectObj} />
            </article>
            <article className="card input-card message-card">
              <TextArea {...textareaObj} />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="Where is it?">
            <article className="card">
              <Location inputID="requestLocation" />
            </article>
          </SessionSetting>

          <SessionSetting headerLabel="Add a photo">
            <Image />
          </SessionSetting>

          <SessionSetting headerLabel="Tasks" clas="jobs-settings">
            <article className="card btn-card job-card">
              <h4 className="job-label">Get materials on site</h4>
              <div className="plus-amount">+10</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Get to location</h4>
              <div className="plus-amount">+5</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Cover roof</h4>
              <div className="plus-amount">+20</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
            <article className="card btn-card job-card">
              <h4 className="job-label">Secure roof</h4>
              <div className="plus-amount">+15</div>
              <div className="take-action-icon">
                <Icon icon={faChevronRight} />
              </div>
            </article>
          </SessionSetting>
        </Main>

        <Footer>
          <div className="button-label">Post your request</div>
          <Submit {...buttonObj} />
        </Footer>
      </Page>
    )
  }
}
