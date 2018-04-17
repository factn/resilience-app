/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import Loader from "../Loader"
import { getBase64 } from "../../resources/Util"
/*** [end of imports] ***/

export default class Submit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonPressed: false
    }
  }

  pressButton = () => {
    this.setState({
      buttonPressed: true
    })
  }

  render() {
    const { inputObj, scenarioId } = this.props
    const {
      // Label properties
      labelPhrase,
      labelIcon,

      // Submit function
      responseType,
      onSubmit,
      onSubmitParams,
      goToPath
    } = inputObj

    return (
      <button
        className={`btn submit-btn ${responseType}-response`}
        onClick={() => {
          if (!this.state.buttonPressed) {
            let values = {}
            this.pressButton()

            if (typeof onSubmit !== "undefined") {
              if (typeof onSubmitParams !== "undefined") {
                let field

                for (let i in onSubmitParams) {
                  field = document.getElementById(onSubmitParams[i])

                  if (field.type === "radio" || field.type === "checkbox")
                    values[i] = field.checked.toString()
                  else if (field.type === "file")
                    values[i] = getBase64().toString()
                  else values[i] = field.value.toString()
                }
              }
              if (goToPath) {
                values["path"] =
                  typeof goToPath === "string"
                    ? scenarioId
                    : goToPath(scenarioId)
              }
              onSubmit(values)
            } else {
              if (goToPath) {
                if (typeof goToPath === "string")
                  this.props.history.push(goToPath)
                else if (typeof goToPath === "function")
                  this.props.history.push(goToPath(scenarioId))
              }
            }
          }
        }}
      >
        {this.state.buttonPressed ? (
          <Loader />
        ) : (
          <Fragment>
            <span className="button-label">{labelPhrase} </span>
            <Icon icon={labelIcon} className="button-icon" />
          </Fragment>
        )}
      </button>
    )
  }
}
