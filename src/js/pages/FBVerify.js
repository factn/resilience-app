/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/fontawesome-free-brands"

// Page wrapper
import Page from "./Page"

// Page elements
import SessionCard from "../components/SessionCard"

// Images
import FBProfilePic from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class FBVerify extends Component {
  render() {
    const header = (
      <Fragment>
        <div className="facebook-icon">
          <Icon icon={faFacebook} />
        </div>
        <h2>Get verified</h2>
      </Fragment>
    )

    const footer = (
      <Fragment>
        <div className="button-label">Send message</div>
        <Link to="/profile" className="btn footer-btn feed-btn">
          Get Verified
        </Link>
      </Fragment>
    )

    let friends = [1, 2, 3, 4, 5]

    return (
      <Page className="flow-page verify-facebook-page" header={header} footer={footer}>
        <div className="or-line-wrap">
          <div className="or-line large-or-line">We weren't able to verify you through your J4R.</div>
          <div className="or-line large-or-line">Choose a friend to verify your identity.</div>
          <div className="or-line">
            If you select a friend, we will send them a message asking them to verify who you are.
          </div>
        </div>
        <section className="friends-list-wrap">
          <SessionCard className="input-card">
            <input type="text" className="search-friends-input" placeholder="Search your friends" />
          </SessionCard>

          <FriendsList friends={friends} />
        </section>
      </Page>
    )
  }
}

const FriendsList = ({ friends }) => (
  <ul className="friends-list">{friends && friends.map(name => <Friend key={`fb_friend_${name}`} />)}</ul>
)

const Friend = props => (
  <li className="friend">
    <figure className="friend-photo-wrap">
      <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
    </figure>
    <div className="friend-name">Alice Smith</div>
    <div className="verification-btn-wrap">
      <button className="btn btn-lite verification-btn">Verify me</button>
    </div>
  </li>
)
