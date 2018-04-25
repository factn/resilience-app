/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/fontawesome-free-brands"

// Page elements
import Header from "../components/Header"
import Main from "../components/Main"
import Footer from "../components/Footer"

// Images
import FBProfilePic from "../../img/fb-profile.jpg"
/*** [end of imports] ***/

export default class FBVerify extends Component {
  render() {
    return (
      <div className="page flow-page verify-facebook-page">
        <Header>
          <div className="facebook-icon">
            <Icon icon={faFacebook} />
          </div>
          <h2>Get verified</h2>
        </Header>
        <Main>
          <div className="or-line">Choose a friend to verify who you are</div>
          <div className="or-line">
            If you select a friend, we will send them a message to verify your
            identity
          </div>
          <section className="friends-list-wrap">
            <div className="card input-card">
              <input
                type="text"
                className="search-friends-input"
                placeholder="Search your friends"
              />
            </div>
            <ul className="friends-list">
              <li className="friend">
                <figure className="friend-photo-wrap">
                  <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
                </figure>
                <div className="friend-name">Alice Smith</div>
                <button className="btn btn-lite verification-btn">Verify me</button>
              </li>
              <li className="friend">
                <figure className="friend-photo-wrap">
                  <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
                </figure>
                <div className="friend-name">Alice Smith</div>
                <button className="btn btn-lite verification-btn">Verify me</button>
              </li>
              <li className="friend">
                <figure className="friend-photo-wrap">
                  <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
                </figure>
                <div className="friend-name">Alice Smith</div>
                <button className="btn btn-lite verification-btn">Verify me</button>
              </li>
              <li className="friend">
                <figure className="friend-photo-wrap">
                  <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
                </figure>
                <div className="friend-name">Alice Smith</div>
                <button className="btn btn-lite verification-btn">Verify me</button>
              </li>
              <li className="friend">
                <figure className="friend-photo-wrap">
                  <img src={FBProfilePic} alt="Alice Smith" className="friend-profile-photo" />
                </figure>
                <div className="friend-name">Alice Smith</div>
                <button className="btn btn-lite verification-btn">Verify me</button>
              </li>
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
  }
}
