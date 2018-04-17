/*** IMPORTS ***/
// Module imports
import { faMapPin, faThumbsUp } from "@fortawesome/fontawesome-free-solid"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class DoerFlow extends Page {
  constructor(props) {
    super(props)

    this.state = {
      pageStyle: "flow",
      title: "Work",
      navMenu: false,
      userId: 1,
      scenarioId: this.props.match.params.scenarioId || 1,
      refreshes: 0
    }
    this.inputs = [
      {
        inputType: "checkbox",
        inputID: "materials",
        labelPhrase: "I'm bringing materials",
        requiredField: false,
        checkedField: true,
        onChange: this.toggleCheckbox,
        onChangeVal: 0
      },
      {
        inputType: "checkbox",
        inputID: "volunteering",
        labelPhrase: "I can provide transportation",
        requiredField: false,
        checkedField: true,
        onChange: this.toggleCheckbox,
        onChangeVal: 1
      },
      {
        inputType: "checkbox",
        inputID: "volunteering",
        labelPhrase: "I'm volunteering",
        requiredField: false,
        checkedField: true,
        onChange: this.toggleCheckbox,
        onChangeVal: 2
      },
      {
        inputType: "location",
        inputID: "location",
        labelPhrase: "Where are you now?",
        labelIcon: faMapPin,
        requiredField: true
      },
      {
        inputType: "submit",
        labelPhrase: "I'm on my way",
        labelIcon: faThumbsUp,
        onSubmit: this.submitDo,
        onSubmitParams: {
          doerlat: "doer_location_lat",
          doerlon: "doer_location_lon"
        },
        responseType: "neutral"
      }
    ]
  }

  toggleCheckbox = inputId => {
    this.inputs[inputId].checkedField = !this.inputs[inputId].checkedField
    this.setState({
      refreshes: this.state.refreshes + 1
    })
  }
  submitDo = params => {
    const { scenarioId, userId } = this.state

    let json = {
      data: {
        type: "scenarios",
        id: scenarioId,
        attributes: {},
        relationships: {
          doer: {
            data: {
              type: "users",
              id: userId || "1"
            }
          }
        }
      }
    }

    Database.updateScenario({ id: scenarioId }, json)
      .then(result => {
        // console.log("Scenario successfully updated:", result)

        this.props.history.push(`/${scenarioId}/info`)
      })
      .catch(error => {
        // console.error("Error updating scenario:", error)
      })
  }
}
