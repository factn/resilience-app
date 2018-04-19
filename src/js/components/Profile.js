/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Components
import MiniScenario from "./MiniScenario"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      honey: false,
      donations: false,
      dos: false,
      requests: false,
      verifications: false,
      userDonations: null,
      userDos: null,
      userRequests: null,
      userVerifications: null,
      currentUserData: null,
      currentUserId: this.props.userId || 1
    }
  }

  componentDidMount = () => {
    this.userDataMount()
    this.userDonationsMount()
    this.userDosMount()
    this.userRequestsMount()
    this.userVerificationsMount()
  }

  userDataMount = () => {
    Database.getUserById({ id: this.state.currentUserId })
      .then(result => {
        // console.log("User successfully found:", result)
        this.setState({
          currentUserData: result.body.data.attributes
        })
      })
      .catch(error => {
        // console.error("Error getting user:", error)
        this.setState({
          currentUserData: null
        })
      })
  }
  userDonationsMount = () => {
    let json = { id: this.props.userId }

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
    let json = { id: this.props.userId }

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
  userRequestsMount = () => {
    let json = { id: this.props.userId }

    Database.getUserRequests(json)
      .then(result => {
        // console.info("Requests call complete:", result.body.data)
        this.setState({
          userRequests: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting requests:", error)
        this.setState({
          userRequests: null
        })
      })
  }
  userVerificationsMount = () => {
    let json = { id: this.props.userId }

    Database.getUserVerifications(json)
      .then(result => {
        // console.info("Verifications call complete:", result.body.data)
        this.setState({
          userVerifications: result.body.data
        })
      })
      .catch(error => {
        // console.error("Error getting verifications:", error)
        this.setState({
          userVerifications: null
        })
      })
  }

  toggleArticle = articleName => {
    if (this.state[articleName]) {
      this.setState({
        honey: false,
        donations: false,
        dos: false,
        requests: false,
        verifications: false
      })
    } else {
      this.setState({
        honey: articleName === "honey",
        donations: articleName === "donations",
        dos: articleName === "dos",
        requests: articleName === "requests",
        verifications: articleName === "verifications"
      })
    }
  }

  render() {
    const {
      userDonations,
      userDos,
      userRequests,
      userVerifications,
      honey,
      donations,
      dos,
      requests,
      verifications,
      currentUserData
    } = this.state

    return (
      <section className="profile">
        {currentUserData && currentUserData.firstname !== "" ? (
          <div className="user-info-area">
            {currentUserData.avatar ? (
              <div className="user-image">
                <img
                  src={currentUserData.avatar}
                  alt={currentUserData.firstname}
                />
              </div>
            ) : (
              <Icon className="user-icon" icon="user" />
            )}

            <div className="user-name">
              {toFirstCap(currentUserData.firstname)}
            </div>
          </div>
        ) : (
          <div className="user-info-area">
            <Icon className="user-icon" icon="question" />
            <a className="user-name not-signed-in" href="/login/">
              Please sign in
            </a>
          </div>
        )}

        <article className={honey ? "profile-article open" : "profile-article"}>
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("honey")}
          >
            <h4>Honey</h4>
            {honey ? (
              <Icon className="profile-icon" icon="caret-up" />
            ) : (
              <Icon className="profile-icon" icon="caret-down" />
            )}
          </header>
        </article>
        <article
          className={donations ? "profile-article open" : "profile-article"}
        >
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("donations")}
          >
            <h4>Donations ({userDonations ? userDonations.length : 0})</h4>
            {donations ? (
              <Icon className="profile-icon" icon="caret-up" />
            ) : (
              <Icon className="profile-icon" icon="caret-down" />
            )}
          </header>
          {userDonations && (
            <div className="profile-content-wrap">
              {userDonations.map(scenario => (
                <MiniScenario
                  key={scenario.id}
                  id={scenario.id}
                  {...scenario.attributes}
                />
              ))}
            </div>
          )}
        </article>
        <article className={dos ? "profile-article open" : "profile-article"}>
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("dos")}
          >
            <h4>Tasks ({userDos ? userDos.length : 0})</h4>
            {dos ? (
              <Icon className="profile-icon" icon="caret-up" />
            ) : (
              <Icon className="profile-icon" icon="caret-down" />
            )}
          </header>
          {userDos && (
            <div className="profile-content-wrap">
              {userDos.map(scenario => (
                <MiniScenario
                  key={scenario.id}
                  id={scenario.id}
                  {...scenario.attributes}
                />
              ))}
            </div>
          )}
        </article>
        <article
          className={requests ? "profile-article open" : "profile-article"}
        >
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("requests")}
          >
            <h4>Requests ({userRequests ? userRequests.length : 0})</h4>
            {requests ? (
              <Icon className="profile-icon" icon="caret-up" />
            ) : (
              <Icon className="profile-icon" icon="caret-down" />
            )}
          </header>
          {userRequests && (
            <div className="profile-content-wrap">
              {userRequests.map(scenario => (
                <MiniScenario
                  key={scenario.id}
                  id={scenario.id}
                  {...scenario.attributes}
                />
              ))}
            </div>
          )}
        </article>
        <article
          className={verifications ? "profile-article open" : "profile-article"}
        >
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("verifications")}
          >
            <h4>
              Verifications ({userVerifications ? userVerifications.length : 0})
            </h4>
            {verifications ? (
              <Icon className="profile-icon" icon="caret-up" />
            ) : (
              <Icon className="profile-icon" icon="caret-down" />
            )}
          </header>
          {userVerifications && (
            <div className="profile-content-wrap">
              {userVerifications.map(scenario => (
                <MiniScenario
                  key={scenario.id}
                  id={scenario.id}
                  {...scenario.attributes}
                />
              ))}
            </div>
          )}
        </article>
      </section>
    )
  }
}
