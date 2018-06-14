/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck, faSmile, faFrown } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import Loader from "../components/Loader"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Reputation extends Component {
  state = {
    userDonations: null,
    userDos: null,
    userRequests: null,
    userVouches: null,
    currentUserData: null,
    userId: this.props.match.params.user_id || Cookies.get("userId") || 1
  }

  componentDidMount = () => {
    this.userDataMount()
    this.userDonationsMount()
    this.userDosMount()
    this.userRequestsMount()
    this.userVouchesMount()
  }

  userDataMount = () => {
    Database.getUserById({ id: this.state.userId })
      .then(result => {
        this.setState({
          currentUserData: result.body.data.attributes
        })
      })
      .catch(error => {
        this.setState({
          currentUserData: null
        })
      })
  }
  userDonationsMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDonations(json)
      .then(result => {
        this.setState({
          userDonations: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          userDonations: null
        })
      })
  }
  userDosMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDos(json)
      .then(result => {
        this.setState({
          userDos: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          userDos: null
        })
      })
  }
  userRequestsMount = () => {
    const json = { id: this.state.userId }

    Database.getUserRequests(json)
      .then(result => {
        this.setState({
          userRequests: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          userRequests: null
        })
      })
  }
  userVouchesMount = () => {
    const json = { id: this.state.userId }

    Database.getUserVouches(json)
      .then(result => {
        this.setState({
          userVouches: result.body.data
        })
      })
      .catch(error => {
        this.setState({
          userVouches: null
        })
      })
  }

  render() {
    const { currentUserData, userDonations, userDos, userRequests, userVouches } = this.state

    let articles = [
      {
        headerLabel: "Honey",
        content: null
      },
      {
        headerLabel: "Donations",
        content: userDonations
      },
      {
        headerLabel: "Tasks",
        content: userDos
      },
      {
        headerLabel: "Requests",
        content: userRequests
      },
      {
        headerLabel: "Vouches",
        content: userVouches
      }
    ]

    return (
      <Page className="profile-page">
        <header className="settings-header">
          <h3>Reputation</h3>
        </header>

        {currentUserData && currentUserData.firstname !== "" ? (
          <div className="user-info-area">
            {currentUserData.avatar ? (
              <div
                className="user-image"
                style={{
                  backgroundImage: `url("${currentUserData.avatar}")`
                }}>
                <img src={currentUserData.avatar} alt={currentUserData.firstname} />
              </div>
            ) : (
              <Icon className="user-icon" icon="user" />
            )}

            <div className="user-name">
              <span>{toFirstCap(currentUserData.firstname)}</span>
              <span className="user-vouched-icon">
                <Icon icon={faCheck} />
              </span>
            </div>
          </div>
        ) : (
          <div className="user-info-area">
            <Icon className="user-icon" icon="question" />
            <Link className="user-name not-signed-in" to="/login/">
              Please sign in
            </Link>
          </div>
        )}

        <section className="profile">
          {articles.map((articleObj, _index) => <ProfileArticle {...articleObj} key={`article#${_index}`} />)}
        </section>
      </Page>
    )
  }
}

const ProfileArticle = props => (
  <article className="profile-article">
    <header className="profile-article-header">
      <h4>
        {props.headerLabel} ({props.content ? props.content.length : 0})
      </h4>
    </header>
    {props.content && <MiniList vouches={props.content} />}
  </article>
)

const MiniList = props => (
  <div className="profile-vouches-wrap">
    {props.vouches ? (
      props.vouches.map((vouch, index) => {
        if (index < 9) {
          let positive = Math.random() > 0.1 // TODO: currently random, will be scenario.attributes.is_complete

          return (
            <div key={vouch.id} className={positive ? "vouch positive" : "vouch negative"}>
              <Icon icon={positive ? faSmile : faFrown} />
            </div>
          )
        } else if (index === 9) {
          return (
            <span className="rest" key="last">
              ...
            </span>
          )
        }
      })
    ) : (
      <div className="vouch">
        <Loader />
      </div>
    )}
  </div>
)
