/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faArrowRight } from "@fortawesome/fontawesome-free-solid"

// Components
import Stars from "./Stars"

// Image
import stubImage from "../../img/stub-image.png"
import fixedRoof from "../../img/fixed-roof.jpg"
/*** [end of imports] ***/

const MissionComplete = props => (
  <section className={props.open ? "modal mission-complete-modal open" : "modal mission-complete-modal"} onClick={() => props.dismiss()}>
    <Stars />
    <h2>We did it!</h2>
    <div className="before-and-after-wrap">
      <figure className="before-image-wrap image-wrap">
        <img src={props.beforeImage || stubImage} alt="Before" className="image before-image" />
        <figcaption className="image-caption before-image-caption">
          <div className="caption-label">Before</div>
        </figcaption>
      </figure>

      <figure className="after-image-wrap image-wrap">
        <img src={fixedRoof} alt="After" className="image after-image" />
        <figcaption className="image-caption after-image-caption">
          <div className="caption-label">After</div>
        </figcaption>
      </figure>
    </div>

    <div className="from-to-icon">
      <Icon icon={faArrowRight} />
    </div>

    <h3>You just made a huge difference</h3>
    <div className="social-share-area">
      <div className="social-share-label">Tell your friends:</div>
      <div className="add-this-wrap">
        <div className="addthis_inline_share_toolbox" />
      </div>
    </div>

    <button className="btn-lite dismiss-btn" onClick={() => props.dismiss()}>
      Dismiss
    </button>
  </section>
)

export default MissionComplete
