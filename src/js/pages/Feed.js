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
      resultsOffset: 0,
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

  filterFeed = (data, offset) => {
    const { type } = this.state
    let unsortedList = []
    let sortedList = []
    let result = []
    let current
    let isFullyFunded
    let isValid = true

    for (let scenario = 0, l = data.length; scenario < l; scenario++) {
      current = data[scenario]
      isValid = true
      isFullyFunded =
        current.attributes.donated >= current.attributes.funding_goal

      if (current.attributes.parent_scenario_id) {
        isValid = false
      } else {
        // TODO: ( use type === "donator"/"doer" ) to adjust who sees funded/unfunded projects
        if (type === "donator") {
          if (isFullyFunded) {
            isValid = false
          }
        }
        if (type === "doer") {
          if (!isFullyFunded) {
            isValid = false
          }
        }
        if (type === "verifier") {
          if (!current.attributes.is_complete) {
            isValid = false
          }
        } else {
          // for everyone other than verifiers, don't show completed missions:
          if (current.attributes.is_complete) {
            isValid = false
          }
        }
      }

      if (isValid) {
        unsortedList.push(current)
      }
    }

    sortedList = unsortedList.sort(
      (a, b) =>
        Date.parse(b.attributes.created_at) -
        Date.parse(a.attributes.created_at)
    )

    if (offset + 3 <= sortedList.length) {
      result = sortedList.slice(offset, offset + 3)
    } else if (offset <= sortedList.length) {
      result = sortedList.slice(offset, sortedList.length)
    }

    return result
  }
  feedScenario = params => {
    const { feedOffset, previewDismissed, type, perSwipeAmount } = this.state
    const { scenario, index } = params

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
          doerPageRoute={() => this.doerPageRoute(scenario.id)}
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
          doerPageRoute={this.doerPageRoute}
        />
      )
    } else if (index > feedOffset + 1) {
      return (
        <Scenario
          key={scenario.id}
          scenario={scenario}
          feedType={type}
          doerPageRoute={this.doerPageRoute}
        />
      )
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
        // console.info("Database call complete:", data)

        this.setState({
          scenarioData: this.filterFeed(data, 0),
          cardsOnPage: 3
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
      resultsOffset,
      perSwipeAmount,
      donatedTotal,
      cardsOnPage
    } = this.state
    const { directionSwiped, fullFundAmount } = params

    if (cardsOnPage === 1) {
      Database.scenarioFeed()
        .then(result => {
          const { data } = result.body
          // console.info("Next in feed call complete:", data)

          this.setState({
            feedOffset: 0,
            resultsOffset: resultsOffset + 3,
            scenarioData: this.filterFeed(data, resultsOffset + 3),
            cardsOnPage: 3
          })
          if (directionSwiped === "right") {
            this.setState({
              donatedTotal:
                parseInt(donatedTotal, 10) + parseInt(perSwipeAmount, 10)
            })
          } else if (directionSwiped === "up") {
            this.setState({
              donatedTotal:
                parseInt(donatedTotal, 10) + parseInt(fullFundAmount, 10),
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
          donatedTotal:
            parseInt(donatedTotal, 10) + parseInt(perSwipeAmount, 10)
        })
      } else if (directionSwiped === "up") {
        this.setState({
          donatedTotal:
            parseInt(donatedTotal, 10) + parseInt(fullFundAmount, 10),
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

  doerPageRoute = scenarioId => {
    this.props.history.push(`/${scenarioId}/doer/instructions`)
  }

  render() {
    const {
      scenarioData,
      type,
      sessionTotal,
      donatedTotal,
      overlayOpen
    } = this.state

    return (
      <Page clas={`feed-page ${type}-feed`}>
        <Thanks open={overlayOpen} dismiss={this.dismissOverlay} />
        <Main>
          <section className={`scenario-feed-wrap ${type}-feed-wrap`}>
            {scenarioData ? (
              scenarioData.map((scenario, index) =>
                this.feedScenario({ scenario, index })
              )
            ) : (
              <Loader />
            )}
          </section>
        </Main>

        {type === "donator" && (
          <Footer>
            <div className="footer-left">
              <div className="dollar-amount">
                {sessionTotal && sessionTotal - donatedTotal > 0
                  ? moneyfy(sessionTotal - donatedTotal)
                  : "$0"}
              </div>
              <h4 className="dollar-amount-label">To spend</h4>
            </div>
            <div className="footer-right">
              <div className="dollar-amount">
                {donatedTotal ? moneyfy(donatedTotal) : "$0"}
              </div>
              <h4 className="dollar-amount-label">Donated</h4>
            </div>
          </Footer>
        )}
      </Page>
    )
  }
}
