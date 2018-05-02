/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Component
import Page from "./Page"
import Main from "../components/Main"
import Scenario from "../components/Scenario"
import Loader from "../components/Loader"

// Footer
import Footer from "../components/Footer"

// Local JS Utilities
import Database from "../resources/Database"
import { moneyfy } from "../resources/Util"
/*** [end of imports] ***/

export default class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scenarioData: null,
      feedOffset: 0,
      userId: Cookies.get("userId") || 1,
      previewDismissed: false,
      type: this.props.match.params.type || 1,
      sessionTotal: null,
      perSwipeAmount: null,
      donatedTotal: 0.0
    }
  }

  componentDidMount = () => {
    this.mountFeedScenarios()
    this.mountUserData()
  }
  mountFeedScenarios = () => {
    Database.scenarioFeed()
      .then(result => {
        // console.info("Database call complete:", result.body)
        this.setState({
          feedOffset: result.body.data.length,
          scenarioData: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          feedOffset: 0,
          scenarioData: null
        })
      })
  }
  mountUserData = () => {
    Database.getUserById({ id: this.state.userId })
      .then(result => {
        // console.log("User successfully found:", result)
        this.setState({
          sessionTotal:
            result.body.data.attributes.default_total_session_donation,
          perSwipeAmount: result.body.data.attributes.default_swipe_donation
        })
      })
      .catch(error => {
        // console.error("Error getting user:", error)
        this.setState({
          sessionTotal: null,
          perSwipeAmount: null
        })
      })
  }

  nextItem = params => {
    const {
      feedOffset,
      scenarioData,
      perSwipeAmount,
      donatedTotal
    } = this.state
    const { directionSwiped, fullFundAmount } = params

    Database.nextInFeed({ offset: feedOffset })
      .then(result => {
        // console.info("Next in feed call complete:", result.body.data)
        this.setState({
          feedOffset: feedOffset + 1,
          scenarioData: scenarioData.concat(result.body.data)
        })
        if (directionSwiped === "right") {
          this.setState({
            donatedTotal: donatedTotal + perSwipeAmount
          })
        } else if (directionSwiped === "up") {
          this.setState({
            donatedTotal: donatedTotal + fullFundAmount
          })
        }
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          feedOffset: 0,
          scenarioData: null
        })
      })
  }
  dismissPreview = () => {
    this.setState({
      previewDismissed: true
    })
  }

  render() {
    const {
      scenarioData,
      feedOffset,
      previewDismissed,
      type,
      sessionTotal,
      donatedTotal,
      perSwipeAmount
    } = this.state

    return (
      <Page clas={`feed-page ${type}-feed`}>
        <Main>
          <section className={`scenario-feed-wrap ${type}-feed-wrap`}>
            {scenarioData ? (
              scenarioData.map((scenario, index) => {
                if (index === feedOffset - 3) {
                  return (
                    <Scenario
                      key={scenario.id}
                      scenario={scenario}
                      first
                      nextItem={this.nextItem}
                      previewDismissed={previewDismissed}
                      dismissPreview={this.dismissPreview}
                      feedType={type}
                      standardAmount={perSwipeAmount}
                    />
                  )
                } else if (index === feedOffset - 2) {
                  return (
                    <Scenario
                      key={scenario.id}
                      scenario={scenario}
                      second
                      nextItem={this.nextItem}
                      previewDismissed={previewDismissed}
                      dismissPreview={this.dismissPreview}
                      feedType={type}
                      standardAmount={perSwipeAmount}
                    />
                  )
                } else if (index > feedOffset - 2) {
                  return (
                    <Scenario
                      key={scenario.id}
                      scenario={scenario}
                      feedType={type}
                    />
                  )
                }
              })
            ) : (
              <Loader />
            )}
          </section>
        </Main>

        {type === "donator" && (
          <Footer>
            <div className="footer-left">
              <div className="dollar-amount">
                {sessionTotal ? moneyfy(sessionTotal) : "0"}
              </div>
              <h4 className="dollar-amount-label">To spend</h4>
            </div>
            <div className="footer-right">
              <div className="dollar-amount">
                {donatedTotal ? moneyfy(donatedTotal) : "0"}
              </div>
              <h4 className="dollar-amount-label">Donated</h4>
            </div>
          </Footer>
        )}
      </Page>
    )
  }
}
