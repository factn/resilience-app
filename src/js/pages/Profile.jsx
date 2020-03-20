/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck, faTags, faBullseye, faDollarSign } from "@fortawesome/fontawesome-free-solid"

// Page wrapper
import Page from "./Page"

// Page elements
import TagList from "../components/TagList"
import SessionCard from "../components/SessionCard"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"

// Images
import logo from "../../img/logo.svg"
import hon3yIcon from "../../img/hon3y.png"
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
    const { currentUserData } = this.state

    let exampleTagList = [
      {
        label: "generosity",
        active: false
      },
      {
        label: "driving",
        active: false
      },
      {
        label: "logistics",
        active: false
      },
      {
        label: "painting",
        active: false
      },
      {
        label: "roofing",
        active: false
      }
    ]

    let missionList = [
      {
        title: "Fix Audrey's Roof",
        score: 4.81,
        role: "doer"
      },
      {
        title: "Drive Joseph",
        score: 4.73,
        role: "doer"
      },
      {
        title: "Paint Jan's House",
        score: 4.37,
        role: "doer"
      },
      {
        title: "Fix Ben's Roof",
        score: 4.87,
        role: "doer"
      },
      {
        title: "Organize Louis' Repairs",
        score: 4.54,
        role: "doer"
      },
      {
        title: "Organize Fiona's Workers",
        score: 4.21,
        role: "doer"
      },
      {
        title: "Build Felix a house",
        score: 4.93,
        role: "donor"
      }
    ]

    return (
      <Page className="profile-page flow-page">
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
            </div>
          </div>
        ) : (
          <div className="user-info-area">
            <Icon className="user-icon" icon="question" />
            <p>
              <Link className="user-name not-signed-in" to="/login/">
                Please sign in
              </Link>
            </p>
          </div>
        )}

        <SessionCard>
          <header className="profile-header">
            <h3 className="profile-mission-title">Missions</h3>
            <span className="profile-mission-count">19</span>
            <span className="profile-hon3y">
              <img src={hon3yIcon} alt="HON3Y" className="hon3y-icon" />
              <span className="hon3y-score">4.35</span>
            </span>
          </header>

          <section className="profile-section">
            <header className="profile-section-header">
              <Icon className="profile-section-header-icon" icon={faTags} />
              <h4 className="profile-section-title">Tags</h4>
            </header>

            <TagList list={exampleTagList} />
          </section>

          <section className="profile-section">
            <header className="profile-section-header">
              <Icon className="profile-section-header-icon" icon={faBullseye} />
              <h4 className="profile-section-title">Recent Missions</h4>
            </header>

            {missionList.map((mission, _index) => <MissionLine {...mission} key={_index} />)}
          </section>
        </SessionCard>
      </Page>
    )
  }
}

const MissionLine = props => (
  <div className="mission-line">
    <div className="mission-role">
      {props.role === "doer" ? (
        <img src={logo} alt="W4GL!" className="w4gl-icon role-image" />
      ) : (
        <Icon className="role-icon" icon={faDollarSign} />
      )}
    </div>
    <div className="mission-title">{props.title}</div>
    <img src={hon3yIcon} alt="HON3Y" className="hon3y-icon" />
    <div className="hon3y-score">{props.score}</div>
  </div>
)
