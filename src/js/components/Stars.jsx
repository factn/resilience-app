/*** IMPORTS ***/
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/fontawesome-free-solid"
/*** [end of imports] ***/

const Stars = () => (
  <div className="stars">
    <Icon className="star" icon={faStar} />
    <Icon className="star" icon={faStar} />
    <Icon className="star" icon={faStar} />
    <Icon className="star" icon={faStar} />
    <Icon className="star" icon={faStar} />
  </div>
)

export default Stars
