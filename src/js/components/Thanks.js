/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Components
import Stars from "./Stars"
/*** [end of imports] ***/

export default class Thanks extends Component {
  render() {
    const { open, dismiss } = this.props
    
    return (
      <section
        className={
          open ? "modal thank-you-modal open" : "modal thank-you-modal"
        }
        onClick={() => dismiss()}
      >
        <Stars />
        <h2>Thanks!</h2>
        <h3>You just made a huge difference</h3>
        <button className="btn-lite dismiss-btn" onClick={() => dismiss()}>
          Dismiss
        </button>
      </section>
    )
  }
}
