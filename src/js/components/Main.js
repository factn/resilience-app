/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Main extends Component {
  render() {
    return <main className="app-main">{this.props.children}</main>
  }
}
