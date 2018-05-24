/*** IMPORTS ***/
// Module imports
import React from "react"
/*** [end of imports] ***/

const SessionSetting = props => (
  <section className={props.className ? `session-settings ${props.className}` : "session-settings"}>
    {props.headerLabel && (
      <header className="settings-header">
        <h3 className="settings-header-label">{props.headerLabel}</h3>
      </header>
    )}
    {props.children}
  </section>
)

export default SessionSetting
