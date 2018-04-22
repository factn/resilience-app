/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
import { faBullseye } from "@fortawesome/fontawesome-free-solid"

// Header
import Header from "../components/Header"
import NavMenu from "../components/NavMenu"

// Main
import Main from "../components/Main"
import ScenarioFeed from "../components/ScenarioFeed"
import Scenario from "../components/Scenario"
import Loader from "../components/Loader"

// Footer
import Footer from "../components/Footer"

// Local JS Utilities
import Database from "../resources/Database"

// Logo image
import logo from "../../img/logo.svg"
/*** [end of imports] ***/

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null,
      userId: 1
    }
  }

  componentDidMount = () => {
    Database.getScenarios()
      .then(result => {
        // console.info("Database call complete:", result.body.data)
        this.setState({
          scenarioData: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          scenarioData: null
        })
      })
  }

  render() {
    const { userId, scenarioData } = this.state

    return (
      <div className="page feed-page">
        <Header>
          <NavMenu userId={userId} />
          <div className="logo">
            <a href="/">
              <img src={logo} alt="WAGL" />
            </a>
          </div>
          <div className="missions-btn">
            <a href="/missions">
              <Icon icon={faBullseye} />
            </a>
          </div>
        </Header>

        <Main>
          <ScenarioFeed>
            {scenarioData ? (
              <Scenario scenario={scenarioData[0]} />
            ) : (
              <Loader />
            )}
          </ScenarioFeed>
        </Main>

        <Footer>
          <div className="footer-left">
            <div className="dollar-amount">$200</div>
            <h4 className="dollar-amount-label">To spend</h4>
          </div>
          <div className="footer-right">
            <div className="dollar-amount">$0</div>
            <h4 className="dollar-amount-label">Donated</h4>
          </div>
        </Footer>
      </div>
    )
  }
}
