/*** IMPORTS ***/
// Module imports
import React from "react"

// Components
import Stars from "./Stars"
/*** [end of imports] ***/

const Thanks = props => (
  <section
    className={
      props.open ? "modal thank-you-modal open" : "modal thank-you-modal"
    }
    onClick={() => props.dismiss()}
  >
    <Stars />

    <h2>Thanks!</h2>
    <h3>You just made a huge difference</h3>

    <button className="btn-lite dismiss-btn" onClick={() => props.dismiss()}>
      Dismiss
    </button>
  </section>
)

export default Thanks
