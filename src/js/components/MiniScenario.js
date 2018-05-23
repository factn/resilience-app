/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"

// Local JS
import { toFirstCap, moneyfy, gradientStyle } from "../resources/Util"
/*** [end of imports] ***/

export default class MiniScenario extends Component {
  render() {
    const { role, tab, imagethumb, noun, verb, requester_firstname, id, donated, funding_goal, event, verified } = this.props

    let fundingGoalSliderStyle = gradientStyle({
      dividend: donated,
      divisor: funding_goal,
      endColor: "#fff"
    })
    return (
      <section className={verified ? "mini-scenario verified" : "mini-scenario"} id={id}>
        <figure
          className="mini-scenario-image-wrap"
          style={{
            backgroundImage: `url("${imagethumb}")`
          }}>
          <img src={imagethumb} alt={`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`} className="mini-scenario-image" />
        </figure>
        <div className="mini-scenario-right">
          <p className="mini-scenario-title">{`${toFirstCap(verb)} ${toFirstCap(requester_firstname)}'s ${noun}`}</p>
          <div className="funding-progress-slider" id={`${event}_fundingGoal`} style={fundingGoalSliderStyle} />
          <div className="funding-goal-label">
            <span className="dollar-amount">{moneyfy(funding_goal - donated)}</span>
            <span> To fund</span>
          </div>

          <ActionBtn {...this.props} />

          {role === "Requests" && tab === "Donating" && !verified && <div className="btn status-btn">Awaiting Verification</div>}
          {role === "Requests" && tab === "Donating" && verified && <div className="btn status-btn verified">Verified and Live</div>}
        </div>
      </section>
    )
  }
}

const ActionBtn = props => {
  const { id, role, tab, verified } = props

  if (role === "Requests") {
    if (tab === "Donating") {
      if (verified) {
        return (
          <Link className="btn btn-lite mini-scenario-link" to={`/${id}/requester`}>
            Post update
          </Link>
        )
      } else {
        return (
          <Link className="btn btn-lite mini-scenario-link" to={`/${id}/requester`}>
            Edit request
          </Link>
        )
      }
    } else if (tab === "In Progress") {
      return (
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/requester`}>
          Post update
        </Link>
      )
    } else if (tab === "Finished") {
      return (
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/info`}>
          Post update
        </Link>
      )
    }
  } else {
    // role === "Missions" or other
    if (tab === "Donating") {
      return (
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/donator`}>
          Fund the rest
        </Link>
      )
    } else if (tab === "In Progress") {
      return (
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/doer/instructions`}>
          Do a task
        </Link>
      )
    } else if (tab === "Finished") {
      return (
        <Link className="btn btn-lite mini-scenario-link" to={`/${id}/info`}>
          Review Story
        </Link>
      )
    }
  }
}
