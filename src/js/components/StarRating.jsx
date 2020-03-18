/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faStar, faStarHalf } from "@fortawesome/fontawesome-free-solid"

// Page Elements
import SessionSetting from "./SessionSetting"
/*** [end of imports] ***/

export default class StarRating extends Component {
  state = {
    rating: this.props.defaultRating || 0
  }

  setRating = rating => {
    this.setState({ rating })
  }
  handleChange = e => {
    this.setState({ rating: e.target.value })
  }

  render() {
    const { rating } = this.state
    const { headerLabel } = this.props

    const stars = rating * 5
    let starList = []

    if (Number.isInteger(stars)) {
      for (let star = 0; star < stars; star++) {
        starList.push(
          <Icon
            className="star filled"
            id={`star${star + 1}`}
            icon={faStar}
            onClick={() => this.setRating((star + 1) / 5)}
            key={`star${star + 1}`}
          />
        )
      }
      for (let blank = stars; blank < 5; blank++) {
        starList.push(
          <Icon
            className="star"
            id={`star${blank + 1}`}
            icon={faStar}
            onClick={() => this.setRating((blank + 1) / 5)}
            key={`star${blank + 1}`}
          />
        )
      }
    } else {
      for (let star = 0; star < stars - 1; star++) {
        starList.push(
          <Icon
            className="star filled"
            id={`star${star + 1}`}
            icon={faStar}
            onClick={() => this.setRating((star + 1) / 5)}
            key={`star${star + 1}`}
          />
        )
      }
      starList.push(
        <Icon
          className="star filled"
          id={`star${stars}`}
          icon={faStarHalf}
          onClick={() => this.setRating((stars + 0.5) / 5)}
          key={`star${stars}`}
        />
      )
      for (let blank = stars + 1.5; blank < 6; blank++) {
        starList.push(
          <Icon
            className="star"
            id={`star${blank + 1}`}
            icon={faStar}
            onClick={() => this.setRating(blank / 5)}
            key={`star${blank + 1}`}
          />
        )
      }
    }

    return (
      <SessionSetting className="star-rating" headerLabel={headerLabel || "Give a Rating"}>
        <div className="rating-wrap">
          <div className="stars-wrap">
            <div className="star-backs">
              <Icon className="star back" icon={faStar} onClick={() => this.setRating(0.2)} />
              <Icon className="star back" icon={faStar} onClick={() => this.setRating(0.4)} />
              <Icon className="star back" icon={faStar} onClick={() => this.setRating(0.6)} />
              <Icon className="star back" icon={faStar} onClick={() => this.setRating(0.8)} />
              <Icon className="star back" icon={faStar} onClick={() => this.setRating(1)} />
            </div>
            <div className="star-fronts">{starList}</div>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            className="rating-slider"
            id="rating"
            value={rating}
            onChange={e => this.handleChange(e)}
          />
        </div>
      </SessionSetting>
    )
  }
}
