/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/fontawesome-free-solid"
/*** [end of imports] ***/

export default class Thanks extends Component {
  render() {
    const { open, dismiss } = this.props
    return (
      <section
        className={open ? "thank-you-modal open" : "thank-you-modal"}
        onClick={() => dismiss()}
      >
        <div className="stars">
          <Icon className="star" icon={faStar} />
          <Icon className="star" icon={faStar} />
          <Icon className="star" icon={faStar} />
          <Icon className="star" icon={faStar} />
          <Icon className="star" icon={faStar} />
        </div>
        <h2>Thanks!</h2>
        <h3>You just made a huge difference</h3>
        <div className="social-share-area">
          <div className="social-share-label">Tell your friends:</div>
          <div className="add-this-wrap">
            <div className="addthis_inline_share_toolbox" />
          </div>
        </div>
        <button className="btn-lite dismiss-btn" onClick={() => dismiss()}>
          Dismiss
        </button>
      </section>
    )
  }
}
