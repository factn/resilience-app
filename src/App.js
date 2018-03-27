/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

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
      currentUserRole: "none",
      scrollEnabled: true
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
            labelIcon: "at",
            requiredField: true
          }, {
            inputType: "password",
            inputID: "pw",
            labelPhrase: "Password",
            labelIcon: "key",
            requiredField: true
          }, {
            inputType: "submit",
            labelPhrase: "Sign In",
            labelIcon: "sign-in-alt",
            onSubmit: this.login,
            onSubmitParams: "Admin"
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
            labelIcon: "id-card-alt",
            requiredField: true
          }, {
            inputType: "text",
            inputID: "last-name",
            labelPhrase: "Last Name",
            labelIcon: "id-card-alt",
            requiredField: false
          }, {
            inputType: "email",
            inputID: "email",
            labelPhrase: "Email",
            labelIcon: "at",
            requiredField: true
          }, {
            inputType: "password",
            inputID: "pw",
            labelPhrase: "Password",
            labelIcon: "key",
            requiredField: true
          }, {
            inputType: "password",
            inputID: "confirm-pw",
            labelPhrase: "Password",
            labelIcon: "key",
            requiredField: true
          }, {
            inputType: "text",
            inputID: "location",
            labelPhrase: "Location",
            labelIcon: "map-pin",
            requiredField: false
          }, {
            inputType: "file",
            inputID: "profile-photo",
            labelPhrase: "Photo",
            labelIcon: "image",
            requiredField: false
          }, {
            inputType: "submit",
            labelPhrase: "Create Account",
            labelIcon: "user-plus",
            onSubmit: this.createUserAccount
          }
        ]
      },
      preferences: {
        title: "Preferences",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Save settings",
            labelIcon: "cogs",
            onSubmit: this.updatePreferences
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
            labelIcon: "cloud",
            requiredField: false
          }, {
            inputType: "text",
            inputID: "description",
            labelPhrase: "What do you need help with?",
            labelIcon: "",
            requiredField: true
          }, {
            inputType: "text",
            inputID: "first-name",
            labelPhrase: "What is your name?",
            labelIcon: "user",
            requiredField: false
          }, {
            inputType: "file",
            inputID: "photo",
            labelPhrase: "Add a photo of what you need help with.",
            labelIcon: "image",
            requiredField: false
          }, {
            inputType: "text",
            inputID: "location",
            labelPhrase: "Where are you?",
            labelIcon: "map-pin",
            requiredField: true
          }, {
            inputType: "submit",
            labelPhrase: "Send someone",
            labelIcon: "check",
            onSubmit: this.submitRequest
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
            labelIcon: "credit-card-front",
            requiredField: true
          }, {
            inputType: "number",
            inputID: "expiration-month",
            labelPhrase: "Expiration Month",
            requiredField: true
          }, {
            inputType: "number",
            inputID: "expiration-year",
            labelPhrase: "Expiration Year",
            requiredField: true
          }, {
            inputType: "number",
            inputID: "cc-sec",
            labelPhrase: "Security number",
            requiredField: true
          }, {
            inputType: "submit",
            labelPhrase: "Donate",
            labelIcon: "money-bill-alt",
            onSubmit: this.submitDonation
          }
        ]
      },
      do: {
        title: "Do Work",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "I'm on my way",
            labelIcon: "thumbs-up",
            onSubmit: this.submitDo
          }
        ]
      },
      verify: {
        title: "Verify",
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Verify this user",
            labelIcon: "check",
            onSubmit: this.submitVerification
          }
        ]
      }
    };
    this.settings = {
      zoomLevel: 14
    };

    // Bindings
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.createUserAccount = this.createUserAccount.bind(this);

    this.updatePreferences = this.updatePreferences.bind(this);

    this.submitRequest = this.submitRequest.bind(this);
    this.submitDonation = this.submitDonation.bind(this);
    this.submitDo = this.submitDo.bind(this);
    this.submitVerification = this.submitVerification.bind(this);
  }
  preventDefault = e => {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;  
  }
  preventDefaultForScrollKeys = e => {
    let keys = {37: 1, 38: 1, 39: 1, 40: 1};
    
    if (keys[e.keyCode]) {
      this.preventDefault(e);
      return false;
    }
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
      openModalName: modalName,
      scrollEnabled: false
    });

    // Disable scroll
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onwheel = this.preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault; // older browsers, IE
    window.ontouchmove  = this.preventDefault; // mobile
    document.onkeydown  = this.preventDefaultForScrollKeys;
  }
  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      openModalName: "",
      scrollEnabled: true
    });

    // Enable scroll
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }
  login = _userFirstName => {
    this.setState({
      userLoggedIn: true,
      userFirstName: _userFirstName,
      currentUserRole: "admin"
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
  createUserAccount = () => {
    this.closeModal();
  }
  updatePreferences = prefs => {
    this.closeModal();
  }
  submitRequest = () => {
    this.closeModal();
  }
  submitDonation = () => {
    this.closeModal();
  }
  submitDo = () => {
    this.closeModal();
  }
  submitVerification = () => {
    this.closeModal();
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