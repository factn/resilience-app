/*** IMPORTS ***/
// Module imports
import React from "react"

// Components
import Header from "../components/Header"
/*** [end of imports] ***/

const Page = props => (
  <div className={props.clas ? `page ${props.clas}` : "page"}>
    <Header />
    {props.children}
  </div>
)

export default Page
