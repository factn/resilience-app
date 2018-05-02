/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Cookies from "js-cookie"

// Component
import Page from "./Page"
import Main from "../components/Main"
import Scenario from "../components/Scenario"
import Loader from "../components/Loader"
import Thanks from "../components/Thanks"

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
      cardsOnPage: null,
      userId: Cookies.get("userId") || 1,
      previewDismissed: false,
      type: this.props.match.params.type || 1,
      sessionTotal: null,
      perSwipeAmount: null,
      donatedTotal: 0.0,
      overlayOpen: false
    }
  }

  componentDidMount = () => {
    this.mountFeedScenarios()
    this.mountUserData()
  }
  mountFeedScenarios = () => {
    Database.scenarioFeed()
      .then(result => {
        const { data } = result.body
        console.info("Database call complete:", data)

        this.setState({
          scenarioData: data,
          cardsOnPage: data.length
        })
      })
      .catch(error => {
        // console.error("Error getting scenarios:", error)
        this.setState({
          feedOffset: 0,
          scenarioData: null,
          cardsOnPage: null
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
      // scenarioData,
      perSwipeAmount,
      donatedTotal,
      cardsOnPage
    } = this.state
    const { directionSwiped, fullFundAmount } = params

    if (cardsOnPage === 1) {
      Database.nextInFeed({ offset: feedOffset + 1 })
        .then(result => {
          const { data } = result.body
          console.info("Next in feed call complete:", data)

          this.setState({
            feedOffset: 0,
            scenarioData: data,
            cardsOnPage: 3
          })
          if (directionSwiped === "right") {
            this.setState({
              donatedTotal: donatedTotal + perSwipeAmount,
              overlayOpen: true
            })
          } else if (directionSwiped === "up") {
            this.setState({
              donatedTotal: donatedTotal + fullFundAmount,
              overlayOpen: true
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
    } else {
      this.setState({
        feedOffset: feedOffset + 1,
        cardsOnPage: cardsOnPage - 1
      })
      if (directionSwiped === "right") {
        this.setState({
          donatedTotal: donatedTotal + perSwipeAmount,
          overlayOpen: true
        })
      } else if (directionSwiped === "up") {
        this.setState({
          donatedTotal: donatedTotal + fullFundAmount,
          overlayOpen: true
        })
      }
    }
  }
  dismissPreview = () => {
    this.setState({
      previewDismissed: true
    })
  }
  dismissOverlay = () => {
    this.setState({
      overlayOpen: false
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
      perSwipeAmount,
      overlayOpen
    } = this.state
    console.log(this.state)

    return (
      <Page clas={`feed-page ${type}-feed`}>
        <Thanks open={overlayOpen} dismiss={this.dismissOverlay} />
        <Main>
          <section className={`scenario-feed-wrap ${type}-feed-wrap`}>
            {scenarioData ? (
              scenarioData.map((scenario, index) => {
                if (index === feedOffset) {
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
                } else if (index === feedOffset + 1) {
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
                } else if (index > feedOffset + 1) {
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
