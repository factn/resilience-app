/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import { getUrlPiece, valuify } from "../../resources/Util"
/*** [end of imports] ***/

export default class Select extends Component {
  render() {
    const {
      // Label properties
      labelPhrase,
      labelIcon,

      // Select
      options,
      preselectedOption,

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
        {labelPhrase && (
          <label className="input-label" htmlFor={`${formName}_${inputID}`}>
            <span className="input-label-phrase">{labelPhrase}</span>
            {typeof labelIcon !== "undefined" && (
              <Icon icon={labelIcon} className="input-label-icon" />
            )}
          </label>
        )}
        <select
          className="form-input"
          id={`${formName}_${inputID}`}
          required={requiredField}
          disabled={disabledField}
        >
          {preselectedOption ? (
            <option value={valuify(preselectedOption)}>
              {preselectedOption}
            </option>
          ) : (
            <option>[Select]</option>
          )}

          {options &&
            options.map((_option, _index) => {
              if (_option.attributes.description !== preselectedOption) {
                return (
                  <option
                    value={valuify(_option.attributes.description)}
                    key={_index}
                  >
                    {_option.attributes.description}
                  </option>
                )
              } else return false
            })}
        </select>
      </div>
    )
  }
}
