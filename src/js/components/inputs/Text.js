/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
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
      placeholder,
      requiredField,
      disabledField
    } = this.props.inputObj

    // text, email, password, number
    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <label
          className="input-label"
          htmlFor={inputID}
        >
          <span className="input-label-phrase">{labelPhrase}</span>
          {typeof labelIcon !== "undefined" && (
            <Icon icon={labelIcon} className="input-label-icon" />
          )}
        </label>
        <input
          className="form-input"
          type={inputType}
          id={inputID}
          placeholder={placeholder || ""}
          required={requiredField}
          disabled={disabledField}
        />
      </div>
    )
  }
}
