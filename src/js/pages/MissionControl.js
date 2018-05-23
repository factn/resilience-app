/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Components
import Page from "./Page"
import MiniScenario from "../components/MiniScenario"
import Main from "../components/Main"
import Loader from "../components/Loader"

// Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

export default class MissionControl extends Component {
  state = {
    role: this.props.match.params.role || "Missions",
    tab: this.props.match.params.tab || "Donating",
    userId: Cookies.get("userId") || 1,
    userDos: null
  }

  componentDidMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDos(json)
      .then(result => {
        const { data } = result.body
        // console.info("Dos call complete:", data)

        this.setState({
          userDos: data
        })
      })
      .catch(error => {
        // console.error("Error getting dos:", error)
        this.setState({
          userDos: null
        })
      })
  }

  changeFlow = role => {
    this.setState({
      role
    })
  }
  changeTab = tab => {
    this.setState({
      tab
    })
  }

  render() {
    const { role, tab, userDos } = this.state

    return (
      <Page className="feed-page mission-control-page">
        <div className="mission-control-subheader">
          <Role active={role === "Requests"} roleName="Requests" changeFlow={this.changeFlow} />
          <Role active={role === "Missions"} roleName="Missions" changeFlow={this.changeFlow} />
        </div>

        <Main>
          <section className="mission-area">
            <header className="tab-list-wrap">
              <ul className="tab-list">
                <Tab active={tab === "Donating"} tabName="Donating" changeTab={this.changeTab} />
                <Tab active={tab === "In Progress"} tabName="In Progress" changeTab={this.changeTab} />
                <Tab active={tab === "Finished"} tabName="Finished" changeTab={this.changeTab} />
              </ul>
            </header>

            <div className="tab-wrap missions-tab-wrap">
              <TabContent tabName={"Donating"} content={userDos} role={role} tab={tab} />
              <TabContent tabName={"In Progress"} content={userDos} role={role} tab={tab} />
              <TabContent tabName={"Finished"} content={userDos} role={role} tab={tab} />
            </div>
          </section>
        </Main>
      </Page>
    )
  }
}

const Role = props => (
  <h4 className={props.active ? "sub-header-option active" : "sub-header-option"} onClick={() => props.changeFlow(props.roleName)}>
    {props.roleName}
  </h4>
)

const Tab = props => (
  <li className={props.active ? "tab-link active" : "tab-link"} onClick={() => props.changeTab(props.tabName)}>
    {props.tabName}
  </li>
)

const TabContent = props => (
  <article className={props.tab === props.tabName ? "tab active" : "tab"}>
    {props.content ? (
      props.content.map(scenario => (
        <MiniScenario key={scenario.id} id={scenario.id} role={props.role} tab={props.tab} {...scenario.attributes} />
      ))
    ) : (
      <Loader />
    )}
  </article>
)
