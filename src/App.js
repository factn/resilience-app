/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';

// Styles
import './App.scss';

// Local JS files
import ModalWrap from './js/ModalWrap';
import Header from './js/Header';
import Main from './js/Main';
import Footer from './js/Footer';

// DB import
import fakeDB from './fakedb.json';
/*** [end of imports] ***/

const versionNumber = "0.1.0";

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      // mapAPIKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w",
      menuIsOpen: false,
      modalIsOpen: false,
      openModalName: "",
      userLoggedIn: false,
      userFirstName: "",
      currentUserRole: "none"
    };

    this.menu = {
      "Log In": () => this.openModal("login"),
      "Preferences": () => this.openModal("preferences"),
      "Close": () => this.closeMenu()
    };
    this.modals = {
      login: {
        title: "Login",
        body: (
          <div className="login-form modal-form">
            <div className="input-wrap">
              <label className="input-label" for="un">
                <span className="input-label-phrase">Username</span>
                <Icon icon="user" className="input-label-icon" />
              </label>
              <input className="form-input" type="text" id="un" />
            </div>
            <div className="input-wrap">
              <label className="input-label" for="pw">
                <span className="input-label-phrase">Password</span>
                <Icon icon="key" className="input-label-icon" />
              </label>
              <input className="form-input" type="password" id="pw" />
            </div>
            <button className="btn submit-btn login-btn" type="submit" onClick={() => this.login("Admin")}>
              <span className="button-label">Sign In </span>
              <Icon icon="sign-in" className="button-icon" />
            </button>
          </div>
        )
      },
      account: {
        title: "Create Account",
        body: (
          <div className="donation-modal-content-wrap modal-content-wrap">
            <form action={() => this.login()} className="login-form modal-form">
              <div className="input-wrap">
                <label className="input-label" for="un"></label>
                <input className="login-input" type="text" id="un" />
              </div>
              <div className="input-wrap">
                <label className="input-label" for="pw"></label>
                <input className="login-input" type="password" id="pw" />
              </div>
              <div className="input-wrap">
                <input className="btn submit-btn login-btn" type="submit" onClick={() => this.login()} />
              </div>
            </form>
          </div>
        )
      },
      preferences: {
        title: "Preferences",
        body: (
          <div className="preferences-modal-content-wrap modal-content-wrap">
            <form action={() => this.updatePreferences()} className="login-form modal-form">
              <div className="input-wrap">
              </div>
              <div className="input-wrap">
                <input className="btn submit-btn preferences-btn" type="submit" onClick={() => this.updatePreferences()} />
              </div>
            </form>
          </div>
        )
      },
      request: {
        title: "Help!",
        body: (
          <div className="request-form modal-form">
            <div className="input-wrap">
              <label className="input-label" for="help-modal-event-select">
                <span className="input-label-phrase">What's the event?</span>
              </label>
              <input className="form-input" type="text" id="help-modal-event-name" />
            </div>
            <div className="input-wrap">
              <label className="input-label" for="help-modal-help-description">
                <span className="input-label-phrase">What do you need help with?</span>
              </label>
              <input className="form-input" type="text" id="help-modal-help-description" />
            </div>
            <div className="input-wrap">
              <label className="input-label" for="help-modal-requester-name">
                <span className="input-label-phrase">What is your name?</span>
              </label>
              <input className="form-input" type="text" id="help-modal-requester-name" />
            </div>
            <div className="input-wrap">
              <label className="input-label" for="help-modal-photo">
                <span className="input-label-phrase">Add a photo of what you need help with.</span>
                <Icon icon="image" className="input-label-icon" />
              </label>
              <input className="form-input" type="file" id="help-modal-photo" />
            </div>
            <div className="input-wrap">
              <label className="input-label" for="help-modal-location">
                <span className="input-label-phrase">Where are you?</span>
                <Icon icon="map-marker" className="input-label-icon" />
              </label>
              <input className="form-input" type="text" id="help-modal-location" />
            </div>
            <button className="btn submit-btn request-btn" type="submit" onClick={() => this.submitRequest()}>
              <span className="button-label">Send someone </span>
              <Icon icon="check" className="button-icon" />
            </button>
          </div>
        )
      },
      donate: {
        title: "Donate",
        body: (
          <div className="donation-modal-content-wrap modal-content-wrap">
            <form action={() => this.updatePreferences()} className="login-form modal-form">
              <div className="input-wrap">
                <label className="input-label" for="help-modal-location">Where are you?</label>
                <input type="text" id="help-modal-location" />
              </div>
            </form>
          </div>
        )
      },
      do: {
        title: "Do Work",
        body: (
          <div className="do-modal-content-wrap modal-content-wrap">
            <form action={() => this.updatePreferences()} className="login-form modal-form">
              <div className="input-wrap">
              </div>
            </form>
          </div>
        ),
        onOpen: () => {
          console.log("Do work!");
        }
      },
      verify: {
        title: "Verify",
        body: (
          <div className="verification"></div>
        )
      }
    };
    this.settings = {
      zoomLevel: 14
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.updatePreferences = this.updatePreferences.bind(this);
    this.submitRequest = this.submitRequest.bind(this);
  }

  openMenu = () => {
    this.setState({
      menuIsOpen: true
    });
  }
  closeMenu = () => {
    this.setState({
      menuIsOpen: false
    });
  }
  openModal = modalName => {
    this.setState({
      menuIsOpen: false,
      modalIsOpen: true,
      openModalName: modalName
    });
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      openModalName: ""
    });
  }
  login = _userFirstName => {
    this.setState({
      userLoggedIn: true,
      userFirstName: _userFirstName
      // currentUserRole: 
    });
    this.closeModal();
  }
  logout = () => {
    this.setState({
      userLoggedIn: false,
      userFirstName: "",
      currentUserRole: "none"
    });
  }
  updatePreferences = prefs => {

  }
  submitRequest = () => {

  }

  render() {
    return (
      <div className="app">
        {/* Modal wrapper */}
        <ModalWrap modalIsOpen={this.state.modalIsOpen}
            closeModalFunction={this.closeModal}
            openModalName={this.state.openModalName}
            modalContent={this.modals[this.state.openModalName]} />

        {/* App header */}
        <Header userFirstName={this.state.userFirstName}
            menuIsOpen={this.state.menuIsOpen}
            openMenuFunction={this.openMenu}
            menuList={this.menu}
            closeMenuFunction={this.closeMenu}
            versionNumber={versionNumber} />

        {/* App main */}
        <Main userLoggedIn={this.state.userLoggedIn}
            database={fakeDB.ads}
            settings={this.settings} />

        {/* App footer */}
        <Footer userLoggedIn={this.state.userLoggedIn}
            openModalFunction={this.openModal}
            logoutFunction={this.logout} />
      </div>
    );
  }
}