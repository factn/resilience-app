/*** IMPORTS ***/
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/fontawesome-free-solid"
/*** [end of imports] ***/

export default class MyComponent extends Component {
  render() {
    return (
      <div className="stars">
        <Icon className="star" icon={faStar} />
        <Icon className="star" icon={faStar} />
        <Icon className="star" icon={faStar} />
        <Icon className="star" icon={faStar} />
        <Icon className="star" icon={faStar} />
      </div>
    )
  }
}
