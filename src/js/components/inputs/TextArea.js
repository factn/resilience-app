/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class TextArea extends Component {
  constructor(props) {
    super(props)

    this.state = {
      remainingCharacterCount: 512
    }
  }

  updateCharacterCount = e => {
    const { value } = e.target

    this.setState({
      remainingCharacterCount: 512 - value.length
    })
  }

  render() {
    const { remainingCharacterCount } = this.state

    const {
      labelPhrase,
      inputID,
      requiredField,
      disabledField
    } = this.props

    return (
      <div
        className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
      >
        <textarea
          placeholder={labelPhrase || "Enter a description"}
          id={inputID}
          maxLength="512"
          rows="3"
          onChange={e => this.updateCharacterCount(e)}
          required={requiredField}
        />
        <div className="remaining-character-count">
          {remainingCharacterCount} characters left
        </div>
      </div>
    )
  }
}
