/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { getUrlPiece } from "../../resources/Util"
/*** [end of imports] ***/

export default class Checkbox extends Component {
  render() {
    const {
      // Label properties
      labelPhrase,
      labelIcon,

      // HTML tag arguments
      inputID,
      requiredField,
      disabledField,
      checkedField,
      onChange,
      onChangeVal
    } = this.props.inputObj
    const formName = getUrlPiece()

    return (
      <div
        className={
          disabledField
            ? "input-wrap checkbox-input-wrap disabled-input"
            : "input-wrap checkbox-input-wrap"
        }
      >
        <input
          className="form-input"
          type="checkbox"
          id={`${formName}_${inputID}`}
          required={requiredField}
          disabled={disabledField}
          checked={checkedField}
          onChange={() => onChange(onChangeVal)}
        />
        <label className="input-label" htmlFor={`${formName}_${inputID}`}>
          <span className="input-label-phrase">{labelPhrase}</span>
          {typeof labelIcon !== "undefined" && (
            <Icon icon={labelIcon} className="input-label-icon" />
          )}
        </label>
      </div>
    )
  }
}
