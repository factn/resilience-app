/*** IMPORTS ***/
// Module imports
import React from "react"

// Page Elements
import Header from "../components/Header"
import Notification from "../components/Notification"
import Thanks from "../components/Thanks"
import Main from "../components/Main"
import Footer from "../components/Footer"
/*** [end of imports] ***/

const Page = props => (
  <div className={props.className ? `page ${props.className}` : "page"}>
    {props.header ? <Header>{props.header}</Header> : <Header />}

    {props.subheader}

    {props.notification && (
      <Notification
        open={props.notificationOpen}
        parentId={props.parentScenarioId}
        childId={props.childScenarioId}
        dismiss={() => props.dismissNotification()}
      />
    )}

    {props.thanks && <Thanks open={props.thanksOpen} dismiss={() => props.dismissThanks()} />}

    <Main>{props.children}</Main>

    {props.footer && <Footer>{props.footer}</Footer>}
  </div>
)

export default Page
