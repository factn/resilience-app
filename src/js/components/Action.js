/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class Action extends Component {
  render() {
    const { label, link, icon } = this.props

    return (
      <div className="action">
        <span className="action-label">{label}</span>
        <Link className="btn action-btn" to={link}>
          <Icon icon={icon} />
        </Link>
      </div>
    )
  }
}
