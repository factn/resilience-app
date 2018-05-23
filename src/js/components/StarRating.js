/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/fontawesome-free-solid"

// Page Elements
import SessionSetting from "./SessionSetting"
/*** [end of imports] ***/

export default class StarRating extends Component {
  state = {
    rating: this.props.defaultRating || 5
  }

  setRating = rating => {
    this.setState({ rating })
  }

  render() {
    const { rating } = this.state

    const starList = [1, 2, 3, 4, 5]

    return (
      <SessionSetting clas="star-rating" headerLabel="Give a Rating">
        <div className="stars-wrap">
          {starList.map(num => (
            <Icon
              className={rating >= num ? "star filled" : "star"}
              id={`star${num}`}
              icon={faStar}
              onClick={() => this.setRating(num)}
              key={`star${num}`}
            />
          ))}
        </div>
        <input type="hidden" value={rating} id="star_rating" disabled />
      </SessionSetting>
    )
  }
}
