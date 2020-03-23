/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

const Text = props => (
  <div
    className={props.disabledField ? "input-wrap disabled-input" : "input-wrap"}
  >
    <label className="input-label" htmlFor={props.inputID}>
      <span className="input-label-phrase">{props.labelPhrase}</span>
      {props.labelIcon && (
        <Icon icon={props.labelIcon} className="input-label-icon" />
      )}
    </label>

    <input
      className="form-input"
      type={props.inputType}
      id={props.inputID}
      placeholder={props.placeholder || ""}
      required={props.requiredField}
      disabled={props.disabledField}
    />
  </div>
)

export default Text
