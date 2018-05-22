/*** IMPORTS ***/
// Module imports
import React from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

const Action = props => (
  <div className="action">
    <span className="action-label">{props.label}</span>

    <Link className="btn action-btn" to={props.link}>
      <Icon icon={props.icon} />
    </Link>
  </div>
)

export default Action
