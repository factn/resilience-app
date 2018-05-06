/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Page elements
import Page from "./Page"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Inputs
import Image from "../components/inputs/Image"
import TextArea from "../components/inputs/TextArea"
import Submit from "../components/inputs/Submit"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"
/*** [end of imports] ***/

export default class DoerConfirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      parentScenarioId: this.props.match.params.scenarioId || "1",
      scenarioId: null,
      verb: this.props.match.params.verb || "fix",
      noun: this.props.match.params.noun || "roof",
      currentUser: Cookies.get("userId") || "1"
    }
  }

  componentDidMount = () => {
    Database.getScenarioWithChildren({ id: this.state.parentScenarioId })
      .then(result => {
        const { data } = result.body.data.relationships.children_scenario
        // console.info("Success getting scenario:", data)
        let idList = []

        for (let i in data) {
          idList.push(data[i].id)
        }

        this.setChildrenScenarioData(idList)
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          scenarioData: null
        })
      })
  }

  setChildrenScenarioData = list => {
    for (let i = 0, l = list.length; i < l; i++) {
      Database.getScenarioWithProofs({ id: list[i] })
        .then(result => {
          const { data } = result.body
          const { noun, verb } = data.attributes

          // console.info("Success getting child scenario:", data)

          if (noun === this.state.noun && verb === this.state.verb) {
            this.setState({
              scenarioId: list[i]
            })
          }
        })
        .catch(error => {
          // console.error("Error getting child scenario:", error)
        })
    }
  }

  submitConfirmation = params => {
    const { scenarioId, parentScenarioId, currentUser } = this.state
    const imageString = getBase64(params.image)

    const json = {
      data: {
        type: "proofs",
        attributes: {
          image: imageString
          // custom_message: params.custom_message || ""
        },
        relationships: {
          scenario: {
            data: {
              type: "scenarios",
              id: scenarioId || parentScenarioId
            }
          },
          verifier: {
            data: {
              type: "users",
              id: currentUser
            }
          }
        }
      }
    }

    Database.createProof(json)
      .then(result => {
        // const { data } = result.body
        // console.log("Proof successfully created:", data)

        this.props.history.push(
          `/${this.state.parentScenarioId}/doer/Instructions`
        )
      })
      .catch(error => {
        // console.error("Error creating proof:", error)
      })
  }

  render() {
    let buttonObj = {
      labelPhrase: "Send Confirmation",
      clas: "footer-btn feed-btn",
      onSubmit: this.submitConfirmation,
      onSubmitParams: {
        photo: "photo",
        custom_message: "description"
      }
    }
    let textareaObj = {
      inputID: "description"
    }

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
              <TextArea {...textareaObj} />
            </article>
          </section>
        </Main>

        <Footer>
          <Submit {...buttonObj} />
        </Footer>
      </Page>
    )
  }
}
