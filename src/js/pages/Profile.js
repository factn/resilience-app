/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import {
  faMapMarkerAlt,
  faPlusCircle,
  faCheck
} from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
// import MiniScenario from "../components/MiniScenario"
import Main from "../components/Main"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Profile extends Component {
  state = {
    currentUserData: null,
    userId: Cookies.get("userId") || 1
  }

  componentDidMount = () => {
    Database.getUserById({ id: this.state.userId })
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

  render() {
    const { currentUserData, userId } = this.state

    return (
      <Page clas="profile-page">
        <Main>
          <header className="settings-header">
            <h3>Profile</h3>
          </header>
          {currentUserData && currentUserData.firstname !== "" ? (
            <div className="user-info-area">
              {currentUserData.avatar ? (
                <div
                  className="user-image"
                  style={{
                    backgroundImage: `url("${currentUserData.avatar}")`
                  }}
                >
                  <img
                    src={currentUserData.avatar}
                    alt={currentUserData.firstname}
                  />
                </div>
              ) : (
                <Icon className="user-icon" icon="user" />
              )}

              <div className="user-name">
                <span>{toFirstCap(currentUserData.firstname)}</span>
                <span className="user-verified-icon">
                  <Icon icon={faCheck} />
                </span>
                <div>
                  <Link
                    className="reputation-link"
                    to={`/reputation/${userId}`}
                  >
                    {" "}
                    See reputation
                  </Link>
                </div>
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
          <section className="discovery-settings-area">
            <header className="discovery-settings-header">
              <h3>Discovery Settings</h3>
            </header>
            <article className="discovery-settings card">
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
                      <Link to="/" className="tag-link">
                        #Donations
                      </Link>
                    </li>
                    <li className="tag">
                      <Link to="/" className="tag-link">
                        #Jobs
                      </Link>
                    </li>
                    <li className="tag">
                      <Link to="/" className="tag-link">
                        #Painting
                      </Link>
                    </li>
                    <li className="tag">
                      <Link to="/" className="tag-link">
                        #Roofing
                      </Link>
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
                      <Link to="/" className="tag-link">
                        #HurricaneKatrina
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </section>
        </Main>
      </Page>
    )
  }
}
