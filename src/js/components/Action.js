/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class Action extends Component {
  render() {
    const { label, link, icon } = this.props

    return (
      <div className="action">
        <span className="action-label">{label}</span>
        <a className="btn action-btn" href={link}>
          <Icon icon={icon} />
        </a>
      </div>
    )
  }
}
