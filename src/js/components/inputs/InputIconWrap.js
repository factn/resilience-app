/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class InputIconWrap extends Component {
  render() {
    const { children, id, icon } = this.props

    return (
      <div className="input-with-icon-wrap">
        <label className="input-icon" htmlFor={id}>
          <Icon icon={icon} />
        </label>
        {children}
      </div>
    )
  }
}
