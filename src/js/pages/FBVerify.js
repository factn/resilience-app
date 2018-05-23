/*** IMPORTS ***/
// Module imports
import React from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/fontawesome-free-brands"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"
import SessionCard from "../components/SessionCard"

// Images
import FBProfilePic from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

const FBVerify = props => (
  <div className="page flow-page verify-facebook-page">
    <Header>
      <div className="facebook-icon">
        <Icon icon={faFacebook} />
      </div>
      <h2>Get verified</h2>
    </Header>

    <Main>
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

        <ul className="friends-list">
          <Friend />
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </ul>
      </section>
    </Main>

    <Footer>
      <div className="button-label">Send message</div>
      <Link to="/profile" className="btn footer-btn feed-btn">
        Get Verified
      </Link>
    </Footer>
  </div>
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

export default FBVerify
