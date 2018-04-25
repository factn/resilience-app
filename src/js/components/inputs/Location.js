/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class Location extends Component {
  render() {
    const { openMapPicker, inputObj, lat, lon } = this.props
    const {
      // Label properties
      labelPhrase,
      labelIcon,

      // HTML tag arguments
      inputID,
      disabledField
    } = inputObj

    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <button
          className="input-label btn btn-label"
          htmlFor={inputID}
          onClick={() => openMapPicker()}
        >
          <span className="input-label-phrase">{labelPhrase}</span>
          {typeof labelIcon !== "undefined" && (
            <Icon icon={labelIcon} className="input-label-icon" />
          )}
        </button>
        <input
          className="form-input"
          type="number"
          id={`${inputID}_lat`}
          value={lat || 0}
          hidden={true}
        />
        <input
          className="form-input"
          type="number"
          id={`${inputID}_lon`}
          value={lon || 0}
          hidden={true}
        />
      </div>
    )
  }
}
