/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { getUrlPiece } from "../../resources/Util"
import FormInput from "../FormInput"
/*** [end of imports] ***/

export default class SplitInput extends Component {
  render() {
    let {
      // Label properties
      labelPhrase,
      labelIcon,

      // Split input row
      inputs,

      // HTML tag arguments
      inputID,
      disabledField
    } = this.props.inputObj
    const formName = getUrlPiece()

    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <label className="input-label" htmlFor={`${formName}_${inputID}`}>
          <span className="input-label-phrase">{labelPhrase}</span>
          {typeof labelIcon !== "undefined" && (
            <Icon icon={labelIcon} className="input-label-icon" />
          )}
        </label>
        <div className="split-input-wrap">
          {inputs.map((_input, _index) => (
            <FormInput inputObj={_input} key={_index} />
          ))}
        </div>
      </div>
    )
  }
}
