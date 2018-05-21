/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faCamera, faCheckCircle } from "@fortawesome/fontawesome-free-solid"

// Local JS
import { prepareFileReader } from "../../resources/Util"
/*** [end of imports] ***/

export default class File extends Component {
  state = {
    photoInField: false
  }

  photoObjectChange = () => {
    this.setState({
      photoInField: true
    })
    prepareFileReader(document.getElementById("photo").files[0])
  }

  render() {
    const { photoInField } = this.state

    return (
      <article className="photo-card">
        {photoInField ? (
          <div className="photo-icon">
            <Icon icon={faCheckCircle} />
          </div>
        ) : (
          <div className="photo-icon">
            <Icon icon={faCamera} />
          </div>
        )}

        <input
          className="form-input"
          id="photo"
          type="file"
          accept="image/*"
          onChange={() => this.photoObjectChange()}
        />

        <div className="button-row">
          <label className="input-label btn" htmlFor="photo">
            Take Photo
          </label>
          <label className="input-label btn" htmlFor="photo">
            Upload Photo
          </label>
        </div>
      </article>
    )
  }
}
