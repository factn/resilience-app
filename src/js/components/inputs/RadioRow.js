/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Local JS
import { getUrlPiece } from "../../resources/Util"
/*** [end of imports] ***/

export default class RadioRow extends Component {
  render() {
    const {
      // Radio row
      radios,
      radioRowName,

      // Label properties
      labelPhrase
    } = this.props.inputObj
    const formName = getUrlPiece()

    return (
      <div className="radio-row-wrap">
        <div className="input-row-label">{labelPhrase}</div>
        {radios.map((_key, i) => (
          <div className="radio-row-input-wrap" key={i}>
            {typeof _key.onChange !== "undefined" ? (
              <input
                className="form-input"
                type="radio"
                id={`${formName}_${_key.inputID}`}
                name={radioRowName}
                onChange={() => _key.onChange(_key.onChangeVal)}
              />
            ) : (
              <input
                className="form-input"
                type="radio"
                id={`${formName}_${_key.inputID}`}
                name={radioRowName}
              />
            )}
            <label
              className="input-label"
              htmlFor={`${formName}_${_key.inputID}`}
            >
              <span className="input-label-phrase">{_key.labelPhrase}</span>
            </label>
          </div>
        ))}
      </div>
    )
  }
}
