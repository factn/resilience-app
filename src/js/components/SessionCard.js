/*** IMPORTS ***/
// Module imports
import React from "react"
/*** [end of imports] ***/

const SessionCard = props => (
  <article className={props.clas ? `card ${props.clas}` : "card"}>
    {props.cardTitle && <h4 className="card-title">{props.cardTitle}</h4>}
    {props.children}
  </article>
)

export default SessionCard
