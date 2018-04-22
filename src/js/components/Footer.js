/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Footer extends Component {
  render() {
    return <footer className="app-footer">{this.props.children}</footer>
  }
}
