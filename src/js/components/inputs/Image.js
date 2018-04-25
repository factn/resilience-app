/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faCamera } from "@fortawesome/fontawesome-free-solid"

// Local JS
import { prepareFileReader } from "../../resources/Util"
/*** [end of imports] ***/

export default class File extends Component {
  render() {
    return (
      <article className="photo-card">
        <div className="photo-icon">
          <Icon icon={faCamera} />
        </div>

        <input
          className="form-input"
          type="file"
          id="photo_upload"
          accept="image/*"
          onChange={() => {
            prepareFileReader(document.getElementById("photo_upload").files[0])
          }}
        />

        <div className="button-row">
          <label className="input-label btn" htmlFor="photo_upload">
            Take Photo
          </label>
          <label className="input-label btn" htmlFor="photo_upload">
            Upload Photo
          </label>
        </div>
      </article>
    )
  }
}
