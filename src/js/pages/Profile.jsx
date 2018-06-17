/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faMapMarkerAlt, faPlusCircle, faCheck } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import TagList from "../components/TagList"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Profile extends Component {
  state = {
    currentUserData: null,
    userId: this.props.match.params.user_id || Cookies.get("userId") || 1
  }

  componentDidMount = () => {
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

  render() {
    const { currentUserData, userId } = this.state

    let exampleTagList1 = [
      {
        label: "Donations",
        active: false
      },
      {
        label: "Jobs",
        active: false
      },
      {
        label: "Painting",
        active: false
      },
      {
        label: "Roofing",
        active: false
      }
    ]
    let exampleTagList2 = [
      {
        label: "HurricaneKatrina",
        active: false
      }
    ]

    return (
      <Page className="profile-page">
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
              <div>
                <Link className="reputation-link" to={`/reputation/${userId}`}>
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
                <TagList list={exampleTagList1} />
              </div>
            </div>
            <div className="settings-box">
              <div className="setting-icon">
                <Icon icon={faPlusCircle} />
              </div>
              <h4 className="setting-label">Events I follow</h4>
              <div className="scenario-tags">
                <TagList list={exampleTagList2} />
              </div>
            </div>
          </article>
        </section>
      </Page>
    )
  }
}
