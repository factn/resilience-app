/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import Loader from "../Loader"
import { getBase64 } from "../../resources/Util"
/*** [end of imports] ***/

export default class Submit extends Component {
  state = {
    buttonPressed: false
  }

  pressButton = () => {
    const { onSubmit, onSubmitParams } = this.props

    if (!this.state.buttonPressed) {
      this.setState({
        buttonPressed: true
      })

      if (onSubmit) {
        if (onSubmitParams) {
          let field
          let values = {}

          for (let i in onSubmitParams) {
            console.log(onSubmitParams[i]);
            
            field = document.getElementById(onSubmitParams[i])

            if (field.type === "radio" || field.type === "checkbox") {
              values[i] = field.checked.toString()
            } else if (field.type === "file") {
              values[i] = getBase64().toString()
            } else {
              values[i] = field.value.toString()
            }
          }

          onSubmit(values)
        } else {
          onSubmit()
        }
      }
    }
  }

  render() {
    const { labelPhrase, labelIcon, clas } = this.props

    return (
      <button
        className={clas ? `btn ${clas}` : "btn"}
        onClick={() => this.pressButton()}
      >
        {this.state.buttonPressed ? (
          <Loader />
        ) : (
          <Fragment>
            <span className="button-label">{labelPhrase} </span>
            {labelIcon && <Icon icon={labelIcon} className="button-icon" />}
          </Fragment>
        )}
      </button>
    )
  }
}
