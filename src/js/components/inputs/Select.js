/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/fontawesome-free-solid"

// Local JS
import { valuify } from "../../resources/Util"
/*** [end of imports] ***/

const Select = props => (
  <div className={props.disabledField ? "input-wrap disabled-input select-wrap" : "input-wrap select-wrap"}>
    <select className="form-input" id={props.inputID} required={props.requiredField} disabled={props.disabledField}>
      {props.preselectedOption ? <Option value={props.preselectedOption} /> : <Option />}

      {props.options &&
        props.options.map((_option, _index) => {
          if (_option.attributes.description !== props.preselectedOption) {
            return <Option value={_option.attributes.description} key={_index} />
          }
          return false
        })}
    </select>

    <label className="drop-down-icon" htmlFor={props.inputID}>
      <Icon icon={faChevronDown} />
    </label>
  </div>
)

const Option = props => <option value={valuify(props.value) || ""}>{props.value || "[Select]"}</option>

export default Select
