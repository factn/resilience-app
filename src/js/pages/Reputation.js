/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Cookies from "js-cookie"
import Icon from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/fontawesome-free-solid"

// Components
import Page from "./Page"
// import MiniScenario from "../components/MiniScenario"
import Main from "../components/Main"

// Utilities
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"

// Icons
import catRed from "../../img/cat-red.svg"
import catGreen from "../../img/cat-green.svg"
/*** [end of imports] ***/

export default class Reputation extends Component {
  state = {
    userDonations: null,
    userDos: null,
    userRequests: null,
    userVerifications: null,
    currentUserData: null,
    userId: this.props.match.params.user_id || Cookies.get("userId") || 1
  }

  componentDidMount = () => {
    this.userDataMount()
    this.userDonationsMount()
    this.userDosMount()
    this.userRequestsMount()
    this.userVerificationsMount()
  }

  userDataMount = () => {
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
  userDonationsMount = () => {
    const json = { id: this.state.userId }

    Database.getUserDonations(json)
      .then(result => {
        const { data } = result.body
        // console.info("Donations call complete:", data)

        this.setState({
          userDonations: data
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
    const json = { id: this.state.userId }

    Database.getUserDos(json)
      .then(result => {
        const { data } = result.body
        // console.info("Dos call complete:", data)

        this.setState({
          userDos: data
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
    const json = { id: this.state.userId }

    Database.getUserRequests(json)
      .then(result => {
        const { data } = result.body
        // console.info("Requests call complete:", data)

        this.setState({
          userRequests: data
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
    const json = { id: this.state.userId }

    Database.getUserVerifications(json)
      .then(result => {
        const { data } = result.body
        // console.info("Verifications call complete:", data)

        this.setState({
          userVerifications: data
        })
      })
      .catch(error => {
        // console.error("Error getting verifications:", error)
        this.setState({
          userVerifications: null
        })
      })
  }

  render() {
    const { currentUserData, userDonations, userDos, userRequests, userVerifications } = this.state

    return (
      <Page clas="profile-page">
        <Main>
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
                <span className="user-verified-icon">
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
            <ProfileArticle headerLabel={"Honey"} content={null} />
            <ProfileArticle headerLabel={"Donations"} content={userDonations} />
            <ProfileArticle headerLabel={"Tasks"} content={userDos} />
            <ProfileArticle headerLabel={"Requests"} content={userRequests} />
            <ProfileArticle headerLabel={"Verifications"} content={userVerifications} />
          </section>
        </Main>
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
    {props.content && <MiniList proofs={props.content} />}
  </article>
)

const MiniList = props => (
  <div className="profile-proofs-wrap">
    {props.proofs &&
      props.proofs.map((proof, index) => {
        if (index < 9) {
          let positive = Math.random() > 0.1 // TODO: currently random, will be scenario.attributes.is_complete

          return (
            <div key={proof.id} className={positive ? "proof positive" : "proof negative"}>
              <img src={positive ? catGreen : catRed} alt="cat" />
              {/* <Icon icon={positive ? faSmile : faFrown} /> */}
            </div>
          )
        } else if (index === 9) {
          return (
            <span className="rest" key="last">
              ...
            </span>
          )
        }
      })}
  </div>
)
