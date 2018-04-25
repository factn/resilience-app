/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"

// Components
import Header from "../components/Header"
/*** [end of imports] ***/

export default class Page extends Component {
  render() {
    const { clas } = this.props

    return (
      <div className={clas ? `page ${clas}` : "page"}>
        <Header />
        {this.props.children}
      </div>
    )
  }
}
