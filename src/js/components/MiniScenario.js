/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Local JS
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class MiniScenario extends Component {
  render() {
    const {
      imagethumb,
      noun,
      verb,
      requester_firstname,
      id,
      donated,
      funding_goal,
      event
    } = this.props

    let fundingGoalSliderStyle = gradientStyle({
      dividend: donated,
      divisor: funding_goal,
      endColor: "#fff"
    })
    return (
      <section className="mini-scenario" id={id}>
        <p className="mini-scenario-title">{`${toFirstCap(verb)} ${toFirstCap(
          requester_firstname
        )}'s ${noun}`}</p>
        <div
          className="funding-progress-slider"
          id={`${event}_fundingGoal`}
          style={fundingGoalSliderStyle}
        />
        <div className="funding-goal-label">
          <span className="dollar-amount">
            {moneyfy(funding_goal - donated)}
          </span>
          <span> To fund</span>
        </div>
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/info`}>
          Fund the rest
        </Link>
      </section>
    )
  }
}
