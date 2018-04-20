/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Footer extends Component {
  render() {
    return (
      <footer className="app-footer">
        {this.props.children}
        <a href="/requester" className="btn footer-btn request-btn">Get Help</a>
      </footer>
    )
  }
}
