/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { getUrlPiece } from "../../resources/Util"
/*** [end of imports] ***/

export default class Text extends Component {
  render() {
    const {
      inputType,

      // Label properties
      labelPhrase,
      labelIcon,

      // HTML tag arguments
      inputID,
      requiredField,
      disabledField
    } = this.props.inputObj
    const formName = getUrlPiece()

    // text, email, password, number
    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <label
          className="input-label"
          htmlFor={`${formName}_${inputID}`}
        >
          <span className="input-label-phrase">{labelPhrase}</span>
          {typeof labelIcon !== "undefined" && (
            <Icon icon={labelIcon} className="input-label-icon" />
          )}
        </label>
        <input
          className="form-input"
          type={inputType}
          id={`${formName}_${inputID}`}
          required={requiredField}
          disabled={disabledField}
        />
      </div>
    )
  }
}
