/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class SessionSetting extends Component {
  render() {
    const { clas, headerLabel, children } = this.props

    return (
      <section
        className={clas ? `session-settings ${clas}` : "session-settings"}
      >
        <header className="settings-header">
          <h3>{headerLabel}</h3>
        </header>
        {children}
      </section>
    )
  }
}
