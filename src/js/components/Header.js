/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Header extends Component {
  render() {
    return (
      <header className="app-header">
        {this.props.children}
        <div className="title">Help with disaster relief.</div>
      </header>
    )
  }
}
