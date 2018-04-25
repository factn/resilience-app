/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS Utilities
import Database from "../resources/Database"

// Header
import Header from "../components/Header"

// Main
import Main from "../components/Main"
import ScenarioContent from "../components/ScenarioContent"
import Loader from "../components/Loader"
import Form from "../components/Form"
import FormInput from "../components/FormInput"
/*** [end of imports] ***/

export default class Info extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null,
      scenarioId: this.props.match.params.scenarioId || 1,
      role: this.props.match.params.role || "Info",
      tab: this.props.match.params.tab || "Overview"
    }
    this.inputs = []

    // Bindings
    this.openMapPicker = this.openMapPicker.bind(this)
    this.closeMapPicker = this.closeMapPicker.bind(this)
  }

  componentDidMount = () => {
    Database.getScenario({ id: this.state.scenarioId })
      .then(result => {
        // console.info("Database call complete:", result.body.data)
        this.setState({
          scenarioData: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          scenarioData: null
        })
      })
  }

  render() {
    const { scenarioId, role, tab } = this.state

    return (
      <div className="page">
        <Header />

        <Main>
          {this.state.scenarioData ? (
            <ScenarioContent
              scenarioId={scenarioId}
              role={role}
              tab={tab}
              {...this.state.scenarioData}
            />
          ) : (
            <Loader />
          )}

          <Form>
            {this.inputs.map((_input, _index) => (
              <FormInput
                key={_index}
                history={this.props.history}
                inputObj={_input}
                scenarioId={scenarioId}
              />
            ))}
          </Form>
        </Main>
      </div>
    )
  }
}
