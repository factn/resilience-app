/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

const InputIconWrap = props => (
  <div className="input-with-icon-wrap">
    <label className="input-icon" htmlFor={props.id}>
      <Icon icon={props.icon} />
    </label>
    {props.children}
  </div>
)

export default InputIconWrap
