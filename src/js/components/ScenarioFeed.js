/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class ScenarioFeed extends Component {
  render() {
    const { feedType } = this.props

    return (
      <section className={`scenario-feed-wrap ${feedType}-feed-wrap`}>{this.props.children}</section>
    )
  }
}
