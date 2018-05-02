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
  constructor(props) {
    super(props)

    this.state = {
      role: this.props.match.params.role || "Missions",
      tab: this.props.match.params.tab || "Donating",
      userId: Cookies.get("userId") || 1,
      userDonations: null,
      userDos: null
    }
  }

  componentDidMount = () => {
    this.userDonationsMount()
    this.userDosMount()
  }
  userDonationsMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDonations(json)
      .then(result => {
        // console.info("Donations call complete:", result.body.data)
        this.setState({
          userDonations: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting donations:", error)
        this.setState({
          userDonations: null
        })
      })
  }
  userDosMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDos(json)
      .then(result => {
        // console.info("Dos call complete:", result.body.data)
        this.setState({
          userDos: result.body.data
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
    const { role, tab, userDonations, userDos } = this.state

    return (
      <Page clas="feed-page mission-control-page">
        <div className="mission-control-subheader">
          <h4
            className={
              role === "Requests"
                ? "sub-header-option active"
                : "sub-header-option"
            }
            onClick={() => this.changeFlow("Requests")}
          >
            Requests
          </h4>
          <h4
            className={
              role === "Missions"
                ? "sub-header-option active"
                : "sub-header-option"
            }
            onClick={() => this.changeFlow("Missions")}
          >
            Missions
          </h4>
        </div>

        <Main>
          <section className="mission-area">
            <header className="tab-list-wrap">
              <ul className="tab-list">
                <li
                  className={
                    tab === "Donating" ? "tab-link active" : "tab-link"
                  }
                  onClick={() => this.changeTab("Donating")}
                >
                  Donating
                </li>
                <li
                  className={
                    tab === "In Progress" ? "tab-link active" : "tab-link"
                  }
                  onClick={() => this.changeTab("In Progress")}
                >
                  In Progress
                </li>
                <li
                  className={
                    tab === "Finished" ? "tab-link active" : "tab-link"
                  }
                  onClick={() => this.changeTab("Finished")}
                >
                  Finished
                </li>
              </ul>
            </header>
            <div className="tab-wrap missions-tab-wrap">
              <article className={tab === "Donating" ? "tab active" : "tab"}>
                {userDos ? (
                  userDos.map(scenario => (
                    <MiniScenario
                      key={scenario.id}
                      id={scenario.id}
                      role={role}
                      tab={tab}
                      {...scenario.attributes}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </article>
              <article className={tab === "In Progress" ? "tab active" : "tab"}>
                {userDos ? (
                  userDos.map(scenario => (
                    <MiniScenario
                      key={scenario.id}
                      id={scenario.id}
                      role={role}
                      tab={tab}
                      {...scenario.attributes}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </article>
              <article className={tab === "Finished" ? "tab active" : "tab"}>
                {userDos ? (
                  userDos.map(scenario => (
                    <MiniScenario
                      key={scenario.id}
                      id={scenario.id}
                      role={role}
                      tab={tab}
                      {...scenario.attributes}
                    />
                  ))
                ) : (
                  <Loader />
                )}
              </article>
            </div>
          </section>
        </Main>
      </Page>
    )
  }
}
