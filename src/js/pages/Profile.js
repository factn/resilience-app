/*** IMPORTS ***/
// Module imports
import React from "react"
import Icon from "@fortawesome/react-fontawesome"
import {
  faBullseye,
  faMapMarkerAlt,
  faPlusCircle
} from "@fortawesome/fontawesome-free-solid"

// Local JS
import Page from "./Page"

// Components
import Header from "../components/Header"
import NavMenu from "../components/NavMenu"
import MiniScenario from "../components/MiniScenario"
import Main from "../components/Main"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"

// Logo image
import logo from "../../img/logo.png"
/*** [end of imports] ***/

export default class Info extends Page {
  constructor(props) {
    super(props)

    this.state = {
      pageStyle: "modal",
      title: "Profile",
      navMenu: true,
      userId: 1,
      scenarioId: this.props.match.params.scenarioId || 1,
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

  profileArea = () => {
    const {
      userDonations,
      userDos,
      userRequests,
      userVerifications
    } = this.state

    return (
      <section className="profile">
        <article className="profile-article">
          <header className="profile-article-header">
            <h4>Honey</h4>
            <Icon className="profile-icon" icon="caret-down" />
          </header>
        </article>
        <article className="profile-article">
          <header
            className="profile-article-header"
            onClick={() => this.toggleArticle("donations")}
          >
            <h4>Donations ({userDonations ? userDonations.length : 0})</h4>
            <Icon className="profile-icon" icon="caret-down" />
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
        <article className="profile-article">
          <header className="profile-article-header">
            <h4>Tasks ({userDos ? userDos.length : 0})</h4>
            <Icon className="profile-icon" icon="caret-down" />
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
        <article className="profile-article">
          <header className="profile-article-header">
            <h4>Requests ({userRequests ? userRequests.length : 0})</h4>
            <Icon className="profile-icon" icon="caret-down" />
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
        <article className="profile-article">
          <header className="profile-article-header">
            <h4>
              Verifications ({userVerifications ? userVerifications.length : 0})
            </h4>
            <Icon className="profile-icon" icon="caret-down" />
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

  render() {
    const { userId, currentUserData } = this.state

    return (
      <div className="page profile-page">
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
          <div className="subheader">
            <div className="subheader-title">Donate Money / Do a job.</div>
            <div className="subheader-title">Post a mission and get help.</div>
          </div>
          <section className="discovery-settings-area">
            <header className="discovery-settings-header">
              <h3>Discovery Settings</h3>
            </header>
            <article className="discovery-settings">
              <div className="settings-box">
                <div className="setting-icon">
                  <Icon icon={faMapMarkerAlt} />
                </div>
                <h4 className="setting-label">Location</h4>
                <div className="location-setting">Wellington, NZ</div>
              </div>
              <div className="settings-box">
                <div className="setting-icon">
                  <Icon icon={faPlusCircle} />
                </div>
                <h4 className="setting-label">I want to do</h4>
                <div className="scenario-tags">
                  <ul className="tag-list">
                    <li className="tag">
                      <a href="" className="tag-link">
                        #Donations
                      </a>
                    </li>
                    <li className="tag">
                      <a href="" className="tag-link">
                        #Jobs
                      </a>
                    </li>
                    <li className="tag">
                      <a href="" className="tag-link">
                        #Painting
                      </a>
                    </li>
                    <li className="tag">
                      <a href="" className="tag-link">
                        #Roofing
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="settings-box">
                <div className="setting-icon">
                  <Icon icon={faPlusCircle} />
                </div>
                <h4 className="setting-label">Events I follow</h4>
                <div className="scenario-tags">
                  <ul className="tag-list">
                    <li className="tag">
                      <a href="" className="tag-link">
                        #HurricaneKatrina
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </Main>
      </div>
    )
  }
}
