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

// Image
import stubImage from "../../img/stub-image.png"
/*** [end of imports] ***/

export default class Confirmation extends Component {
  state = {
    scenarioData: null,
    parentScenarioId: this.props.match.params.scenarioId || "1",
    scenarioId: null,
    role: this.props.match.params.role || "doer",
    verb: this.props.match.params.verb || "fix",
    noun: this.props.match.params.noun || "roof",
    currentUser: Cookies.get("userId") || "1"
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
              scenarioData: data,
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
    const { scenarioId, parentScenarioId, currentUser, role } = this.state
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

        this.props.history.push(`/${parentScenarioId}/${role}/instructions`)
      })
      .catch(error => {
        // console.error("Error creating proof:", error)
      })
  }

  render() {
    const { role } = this.state
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
      <Page clas={`flow-page ${role}-flow-page`}>
        <Main>
          <h2 className="confirmation-header">
            {role === "doer"
              ? "Help verify your work"
              : "Verify the work is complete"}
          </h2>
          {role === "requester" && (
            <section className="session-settings verify-settings">
              <article className="card verify-card">
                <h4 className="card-title">Work to verify</h4>
                <figure className="verify-wrap">
                  <div className="verify-image-wrap">
                    <img src={stubImage} alt="Work" className="verify-image" />
                  </div>
                  <figcaption className="verify-image-caption">
                    <div className="verify-message">
                      We worked hard and I feel we did a good job. Good luck
                      with the rest of the repairs.
                    </div>
                  </figcaption>
                </figure>
              </article>
            </section>
          )}
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
