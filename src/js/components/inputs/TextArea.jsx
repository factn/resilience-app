/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class TextArea extends Component {
  state = {
    maxCharacterCount: this.props.maxCharacterCount || 140,
    remainingCharacterCount: this.props.remainingCharacterCount || 140
  }

  updateCharacterCount = e => {
    const { value } = e.target

    this.setState({
      remainingCharacterCount: 140 - value.length
    })
  }

  render() {
    const { maxCharacterCount, remainingCharacterCount } = this.state
    const { labelPhrase, inputID, requiredField, disabledField } = this.props

    return (
      <div className={disabledField ? "input-wrap disabled-input" : "input-wrap"}>
        <textarea
          placeholder={labelPhrase || "Enter a description"}
          id={inputID}
          maxLength={maxCharacterCount}
          rows="3"
          onChange={e => this.updateCharacterCount(e)}
          required={requiredField}
        />

        <div className="remaining-character-count">{remainingCharacterCount} characters left</div>
      </div>
    )
  }
}
