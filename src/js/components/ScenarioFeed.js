/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class ScenarioFeed extends Component {
  render() {
    return (
      <section className="scenario-feed-wrap">{this.props.children}</section>
    )
  }
}
