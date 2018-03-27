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
        inputs: [
          {
            inputType: "email",
            inputID: "email",
            labelPhrase: "Email",
            labelIcon: "at"
          }, {
            inputType: "password",
            inputID: "pw",
            labelPhrase: "Password",
            labelIcon: "key"
          }, {
            inputType: "submit",
            labelPhrase: "Sign In",
            labelIcon: "sign-in"
          }
        ]
      },
      account: {
        title: "Create Account",
        inputs: [
          {
            inputType: "text",
            inputID: "first-name",
            labelPhrase: "First Name",
            labelIcon: "id-card-alt"
          }, {
            inputType: "text",
            inputID: "last-name",
            labelPhrase: "Last Name",
            labelIcon: "id-card-alt"
          }, {
            inputType: "email",
            inputID: "email",
            labelPhrase: "Email",
            labelIcon: "at"
          }, {
            inputType: "password",
            inputID: "pw",
            labelPhrase: "Password",
            labelIcon: "key"
          }, {
            inputType: "password",
            inputID: "confirm-pw",
            labelPhrase: "Password",
            labelIcon: "key"
          }, {
            inputType: "text",
            inputID: "location",
            labelPhrase: "Location",
            labelIcon: "map-pin"
          }, {
            inputType: "file",
            inputID: "profile-photo",
            labelPhrase: "Photo",
            labelIcon: "image"
          }, {
            inputType: "submit",
            labelPhrase: "Create Account",
            labelIcon: "user-plus"
          }
        ]
      },
      preferences: {
        title: "Preferences",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Save settings",
            labelIcon: "cogs"
          }
        ]
      },
      request: {
        title: "Help!",
        inputs: [
          {
            inputType: "text",
            inputID: "event-name",
            labelPhrase: "What disaster has effected you?",
            labelIcon: "cloud"
          }, {
            inputType: "text",
            inputID: "description",
            labelPhrase: "What do you need help with?",
            labelIcon: ""
          }, {
            inputType: "text",
            inputID: "first-name",
            labelPhrase: "What is your name?",
            labelIcon: "user"
          }, {
            inputType: "file",
            inputID: "photo",
            labelPhrase: "Add a photo of what you need help with.",
            labelIcon: "image"
          }, {
            inputType: "text",
            inputID: "location",
            labelPhrase: "Where are you?",
            labelIcon: "map-pin"
          }, {
            inputType: "submit",
            labelPhrase: "Send someone",
            labelIcon: "check"
          }
        ]
      },
      donate: {
        title: "Donate",
        inputs: [
          {
            inputType: "number",
            inputID: "credit-card",
            labelPhrase: "Credit card number",
            labelIcon: "credit-card-front"
          }, {
            inputType: "number",
            inputID: "expiration-month",
            labelPhrase: "Expiration"
          }, {
            inputType: "number",
            inputID: "expiration-year",
            labelPhrase: "Expiration"
          }, {
            inputType: "number",
            inputID: "cc-sec",
            labelPhrase: "Security number"
          }, {
            inputType: "submit",
            labelPhrase: "Save settings",
            labelIcon: "cogs"
          }
        ]
      },
      do: {
        title: "Do Work",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Save settings",
            labelIcon: "cogs"
          }
        ]
      },
      verify: {
        title: "Verify",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Save settings",
            labelIcon: "cogs"
          }
        ]
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
            openModalFunction={this.openModal}
            settings={this.settings} />

        {/* App footer */}
        <Footer userLoggedIn={this.state.userLoggedIn}
            openModalFunction={this.openModal}
            logoutFunction={this.logout} />
      </div>
    );
  }
}