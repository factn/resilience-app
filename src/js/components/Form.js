/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
/*** [end of imports] ***/

export default class Form extends Component {
  render() {
    return <div className="page-form">{this.props.children}</div>
  }
}
