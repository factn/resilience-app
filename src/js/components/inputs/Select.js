/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/fontawesome-free-solid"

// Local JS
import { valuify } from "../../resources/Util"
/*** [end of imports] ***/

export default class Select extends Component {
  render() {
    const {
      options,
      preselectedOption,
      inputID,
      requiredField,
      disabledField
    } = this.props

    return (
      <div
        className={
          disabledField
            ? "input-wrap disabled-input select-wrap"
            : "input-wrap select-wrap"
        }
      >
        <select
          className="form-input"
          id={inputID}
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
        <label className="drop-down-icon" htmlFor={inputID}>
          <Icon icon={faChevronDown} />
        </label>
      </div>
    )
  }
}
