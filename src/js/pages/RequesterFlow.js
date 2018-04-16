/*** IMPORTS ***/
// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64, unvaluify } from "../resources/Util"
/*** [end of imports] ***/

export default class RequesterFlow extends Page {
  constructor(props) {
    super(props)

    this.state = {
      pageStyle: "flow",
      title: "Get help!",
      navMenu: false,
      userId: 1,
      scenarioId: this.props.match.params.scenarioId || 1,
      scenarioData: null,
      refreshes: 0
    }
    this.inputs = [
      {
        inputType: "select",
        inputID: "event-name",
        labelPhrase: "What disaster has effected you?",
        labelIcon: "cloud",
        options: null,
        preselectedOption: null,
        requiredField: false
      },
      {
        inputType: "split-input",
        labelPhrase: "What do you need help with?",
        requiredField: true,
        inputs: [
          {
            inputType: "select",
            inputID: "verb",
            options: null,
            preselectedOption: null,
            requiredField: false
          },
          {
            inputType: "select",
            inputID: "noun",
            options: null,
            preselectedOption: null,
            requiredField: false
          }
        ]
      },
      {
        inputType: "text",
        inputID: "first-name",
        labelPhrase: "What is your name?",
        labelIcon: "user",
        requiredField: false
      },
      {
        inputType: "file",
        inputID: "photo",
        labelPhrase: "Show us what happened",
        labelIcon: "image",
        requiredField: false
      },
      {
        inputType: "location",
        inputID: "location",
        labelPhrase: "Where are you?",
        labelIcon: "map-pin",
        requiredField: true
      },
      {
        inputType: "select",
        inputID: "verification-choice",
        labelPhrase: "Who can verify your identity?",
        labelIcon: "question-circle",
        options: [
          {
            attributes: {
              description: "Facebook friends"
            }
          },
          {
            attributes: {
              description: "Twitter followers"
            }
          },
          {
            attributes: {
              description: "Instagram followers"
            }
          }
        ],
        requiredField: false
      },
      {
        inputType: "text",
        inputID: "custom-message",
        labelPhrase: "Anything else you'd like to say?",
        labelIcon: "i-cursor",
        requiredField: false
      },
      {
        inputType: "submit",
        labelPhrase: "Send someone",
        labelIcon: "check",
        onSubmit: this.submitRequest,
        onSubmitParams: {
          event: "requester_event-name",
          image: "requester_photo",
          requester_firstname: "requester_first-name",
          requesterlat: "requester_location_lat",
          requesterlon: "requester_location_lon",
          noun: "requester_noun",
          verb: "requester_verb",
          verificationChoice: "requester_verification-choice",
          customMessage: "requester_custom-message"
        },
        responseType: "neutral"
      }
    ]
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
        const { data } = result.body
        // console.info("Database call complete:", data)

        this.inputs[0].preselectedOption = data.attributes.event
        this.inputs[1].inputs[0].preselectedOption = data.attributes.verb
        this.inputs[1].inputs[1].preselectedOption = data.attributes.noun
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
  setEventData = () => {
    Database.getEvents()
      .then(result => {
        // console.info("Events call complete:", result.body.data)
        this.inputs[0].options = result.body.data
        this.setState({
          refreshes: this.state.refreshes + 1
        })
      })
      .catch(error => {
        // console.error("Error getting events:", error)
      })
  }
  setVerbData = () => {
    Database.getNouns()
      .then(result => {
        // console.info("Nouns call complete:", result.body.data)
        this.inputs[1].inputs[1].options = result.body.data
        this.setState({
          refreshes: this.state.refreshes + 1
        })
      })
      .catch(error => {
        // console.error("Error getting nouns:", error)
      })
  }
  setNounData = () => {
    Database.getVerbs()
      .then(result => {
        // console.info("Verbs call complete:", result.body.data)
        this.inputs[1].inputs[0].options = result.body.data
        this.setState({
          refreshes: this.state.refreshes + 1
        })
      })
      .catch(error => {
        // console.error("Error getting verbs:", error)
      })
  }

  submitRequest = params => {
    let relatedEventId
    let relatedNounId
    let relatedVerbId
    let imageString = getBase64(params.image)

    Database.getEventId({ description: unvaluify(params.event) })
      .then(result => {
        // console.log("Event successfully found:", result)
        relatedEventId = result.body.data[0].id
      })
      .catch(error => {
        // console.error("Error finding event:", error)
        relatedEventId = "1"
      })

    Database.getNounId({ description: unvaluify(params.noun) })
      .then(result => {
        // console.log("Noun successfully found:", result)
        relatedNounId = result.body.data[0].id
      })
      .catch(error => {
        // console.error("Error finding noun:", error)
        relatedNounId = "1"
      })

    Database.getVerbId({ description: unvaluify(params.verb) })
      .then(result => {
        // console.log("Verb successfully found:", result)
        relatedVerbId = result.body.data[0].id
      })
      .catch(error => {
        // console.error("Error finding verb:", error)
        relatedVerbId = "1"
      })

    let getIds = setInterval(() => {
      if (relatedEventId && relatedNounId && relatedVerbId) {
        clearInterval(getIds)
        let json = {
          data: {
            type: "scenarios",
            attributes: {
              funding_goal: "50",
              image: imageString
            },
            relationships: {
              event: {
                data: {
                  type: "events",
                  id: relatedEventId
                }
              },
              noun: {
                data: {
                  type: "nouns",
                  id: relatedNounId
                }
              },
              verb: {
                data: {
                  type: "verbs",
                  id: relatedVerbId
                }
              },
              requester: {
                data: {
                  type: "users",
                  id: this.state.userId || "1"
                }
              },
              doer: {
                data: {
                  type: "users",
                  id: "1"
                }
              }
            }
          }
        }

        Database.createScenario(json)
          .then(result => {
            // console.log("Scenario successfully created:", result)

            this.makeNewRequestChildrenScenarios({
              parentScenarioId: result.body.data.id,
              image: imageString,
              event: relatedEventId,
              path: params.path || "/"
            })
          })
          .catch(error => {
            // console.error("Error creating scenario:", error)
          })
      }
    }, 100)
  }
  makeNewRequestChildrenScenarios = params => {
    let json = {
      image: params.image,
      event: params.event,
      parentScenarioId: params.parentScenarioId
    }

    this.makeMaterialsScenario(json)
    this.makeTransportationScenario(json)
    this.makeVolunteersScenario(json)
  }
  makeMaterialsScenario = params => {
    let json = {
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "50",
          image: params.image
        },
        relationships: {
          event: {
            data: {
              type: "events",
              id: params.event || "1"
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "6" // Materials
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "1" // Get
            }
          },
          requester: {
            data: {
              type: "users",
              id: this.state.currentUserId || "1"
            }
          },
          doer: {
            data: {
              type: "users",
              id: "1"
            }
          },
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Child scenario 1 successfully created:", result)
        this.attachChildToParent({
          parentScenarioId: params.parentScenarioId,
          childId: result.body.data.id
        })
      })
      .catch(error => {
        // console.error("Error creating child scenario:", error)
      })
  }
  makeTransportationScenario = params => {
    let json = {
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "50",
          image: params.image
        },
        relationships: {
          event: {
            data: {
              type: "events",
              id: params.event || "1"
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "18" // Transportation
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "1" // Get
            }
          },
          requester: {
            data: {
              type: "users",
              id: this.state.currentUserId || "1"
            }
          },
          doer: {
            data: {
              type: "users",
              id: "1"
            }
          },
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Child scenario 2 successfully created:", result)
        this.attachChildToParent({
          parentScenarioId: params.parentScenarioId,
          childId: result.body.data.id
        })
      })
      .catch(error => {
        // console.error("Error creating child scenario:", error)
      })
  }
  makeVolunteersScenario = params => {
    let json = {
      data: {
        type: "scenarios",
        attributes: {
          funding_goal: "50",
          image: params.image
        },
        relationships: {
          event: {
            data: {
              type: "events",
              id: params.event || "1"
            }
          },
          noun: {
            data: {
              type: "nouns",
              id: "17" // Volunteers
            }
          },
          verb: {
            data: {
              type: "verbs",
              id: "3" // Find
            }
          },
          requester: {
            data: {
              type: "users",
              id: this.state.currentUserId || "1"
            }
          },
          doer: {
            data: {
              type: "users",
              id: "1"
            }
          },
          parent_scenario: {
            data: {
              type: "scenarios",
              id: params.parentScenarioId
            }
          }
        }
      }
    }

    Database.createScenario(json)
      .then(result => {
        console.log("Child scenario 3 successfully created:", result)
        this.attachChildToParent({
          parentScenarioId: params.parentScenarioId,
          childId: result.body.data.id
        })
      })
      .catch(error => {
        // console.error("Error creating child scenario:", error)
      })
  }
  attachChildToParent = params => {
    let json = {
      data: {
        type: "scenarios",
        id: params.parentScenarioId,
        relationships: {
          child_scenario: {
            type: "scenarios",
            id: params.childId
          }
        }
      }
    }

    this.props.history.push(`/${params.parentScenarioId}/info`)

    // This doesn't work yet, don't have access to child_scenario attribute above
    Database.updateScenario({ id: params.parentScenarioId }, json)
      .then(result => {
        // console.log("Children scenarios successfully connected to parent:", result)
      })
      .catch(error => {
        // console.error("Error connecting child scenarios:", error)
      })
  }
}
