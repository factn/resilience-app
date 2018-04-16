/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { getUrlPiece, prepareFileReader } from "../../resources/Util"
/*** [end of imports] ***/

export default class File extends Component {
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

    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <label
          className="input-label btn btn-label"
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
          accept="image/*"
          required={requiredField}
          disabled={disabledField}
          onChange={() => {
            prepareFileReader(
              document.getElementById(`${formName}_${inputID}`).files[0]
            )
          }}
        />
      </div>
    )
  }
}
