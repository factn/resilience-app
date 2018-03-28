/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';

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
      scrollEnabled: true,
      refreshes: 0,
      mapPickerIsOpen: false
    };
    this.settings = {
      zoomLevel: 14,
      defaultDonationAmount: "$3",
      thankYouTimer: 2000
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
            onSubmitParams: "Admin",
            responseType: "neutral"
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
            onSubmit: this.createUserAccount,
            responseType: "neutral"
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
            onSubmit: this.updatePreferences,
            responseType: "neutral"
          }
        ]
      },
      request: {
        title: "Help!",
        adContent: {},
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
            labelPhrase: "Show us what happened",
            labelIcon: "image",
            requiredField: false
          }, {
            inputType: "location",
            inputID: "location",
            labelPhrase: "Where are you?",
            labelIcon: "map-pin",
            requiredField: true
          }, {
            inputType: "submit",
            labelPhrase: "Send someone",
            labelIcon: "check",
            onSubmit: this.submitRequest,
            responseType: "neutral"
          }
        ]
      },
      donate: {
        title: "Donate",
        adContent: {},
        inputs: [
          {
            inputType: "radio-row",
            requiredField: true,
            labelPhrase: "Donation amount",
            radioRowName: "donation-amount-options",
            radios: [{
              inputID: "preset-amount",
              labelPhrase: this.settings.defaultDonationAmount,
              onChange: this.toggleCustomDonationAmount,
              onChangeVal: false
            }, {
              inputID: "remaining-amount",
              labelPhrase: "Remainder of project",
              onChange: this.toggleCustomDonationAmount,
              onChangeVal: false
            }, {
              inputID: "custom-donation-amount-radio",
              labelPhrase: "Custom",
              onChange: this.toggleCustomDonationAmount,
              onChangeVal: true
            }]
          }, {
            inputType: "number",
            inputID: "custom-donation-amount",
            labelPhrase: "Custom amount",
            labelIcon: "i-cursor",
            requiredField: false,
            disabledField: true
          }, {
            inputType: "hr"
          }, {
            inputType: "radio-row",
            labelPhrase: "Payment Method",
            requiredField: true,
            radioRowName: "payment-method-options",
            radios: [{
              inputID: "paypal",
              labelPhrase: "PayPal",
              onChange: this.toggleCreditCardFields,
              onChangeVal: false
            }, {
              inputID: "lion-bucks",
              labelPhrase: "Lion-Bucks",
              onChange: this.toggleCreditCardFields,
              onChangeVal: false
            }, {
              inputID: "credit-card",
              labelPhrase: "Credit Card",
              onChange: this.toggleCreditCardFields,
              onChangeVal: true
            }]
          }, {
            inputType: "number",
            inputID: "credit-card",
            labelPhrase: "Credit card number",
            labelIcon: "credit-card",
            requiredField: false,
            disabledField: true
          }, {
            inputType: "number",
            inputID: "expiration-month",
            labelPhrase: "Expiration Month",
            requiredField: false,
            disabledField: true
          }, {
            inputType: "number",
            inputID: "expiration-year",
            labelPhrase: "Expiration Year",
            requiredField: false,
            disabledField: true
          }, {
            inputType: "number",
            inputID: "cc-sec",
            labelPhrase: "Security number",
            requiredField: false,
            disabledField: true
          }, {
            inputType: "submit",
            labelPhrase: "Donate",
            labelIcon: "money-bill-alt",
            onSubmit: this.submitDonation,
            responseType: "neutral"
          }
        ]
      },
      do: {
        title: "Do Work",
        adContent: {},
        inputs: [
          {
            inputType: "location",
            inputID: "location",
            labelPhrase: "Where are you now?",
            labelIcon: "map-pin",
            requiredField: true
          }, {
            inputType: "submit",
            labelPhrase: "I'm on my way",
            labelIcon: "thumbs-up",
            onSubmit: this.submitDo,
            responseType: "neutral"
          }
        ]
      },
      verify: {
        title: "Verify",
        adContent: {},
        inputs: [
          {
            inputType: "submit",
            labelPhrase: "Verify this user",
            labelIcon: "check",
            onSubmit: this.submitVerification,
            onSubmitParams: true,
            responseType: "positive"
          }, {
            inputType: "submit",
            labelPhrase: "I don't know them",
            labelIcon: "times",
            onSubmit: this.submitVerification,
            onSubmitParams: false,
            responseType: "negative"
          }
        ]
      },
      thanks: {
        title: "Feel good about yourself",
        customContent: (
          <div className="modal-custom-content-wrap thank-you-modal-custom-content">
            <h4>You just made a huge difference</h4>
            <Icon className="thank-you-icon" icon="thumbs-up" />
          </div>
        )
      }
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

    this.toggleCustomDonationAmount = this.toggleCustomDonationAmount.bind(this);
    this.toggleCreditCardFields = this.toggleCreditCardFields.bind(this);

    this.openMapPicker = this.openMapPicker.bind(this);
    this.closeMapPicker = this.closeMapPicker.bind(this);

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
    let keys = {33: 1, 34: 1, 37: 1, 38: 1, 39: 1, 40: 1};
    
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
    
    window.onwheel = this.preventDefault;                               // modern standard
    window.onmousewheel = document.onmousewheel = this.preventDefault;  // older browsers, IE
    window.ontouchmove  = this.preventDefault;                          // mobile
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
    for (let _pref in prefs) {

    }
    this.closeModal();
  }

  toggleCustomDonationAmount = turnedOn => {
    let { inputs } = this.modals.donate;

    if (turnedOn) {
      inputs[1].requiredField = true;
      inputs[1].disabledField = false;
    } else {
      inputs[1].requiredField = false;
      inputs[1].disabledField = true;
    }

    this.setState({
      refreshes: this.state.refreshes + 1
    });
  }
  toggleCreditCardFields = turnedOn => {
    let { inputs } = this.modals.donate;

    if (turnedOn) {
      for (let i = 4; i < 8; i++) {
        inputs[i].requiredField = true;
        inputs[i].disabledField = false;
      }
    } else {
      for (let i = 4; i < 8; i++) {
        inputs[i].requiredField = false;
        inputs[i].disabledField = true;
      }
    }

    this.setState({
      refreshes: this.state.refreshes + 1
    });
  }

  openMapPicker = () => {
    this.setState({
      mapPickerIsOpen: true,
      modalIsOpen: false
    });
  }
  closeMapPicker = () => {
    if (this.state.mapPickerIsOpen) {
      this.setState({
        mapPickerIsOpen: false,
        modalIsOpen: true
      });
    }
  }

  submitRequest = () => {
    this.closeModal();
  }
  submitDonation = () => {
    this.openModal("thanks");
    setTimeout(() => {
      this.closeModal();
    }, this.settings.thankYouTimer);
  }
  submitDo = () => {
    this.closeModal();
  }
  submitVerification = isVerified => {
    this.closeModal();
  }

  render() {
    return (
      <div className="app">
        {/* Modal wrapper */}
        <ModalWrap modalIsOpen={this.state.modalIsOpen}
            closeModalFunction={this.closeModal}
            openModalName={this.state.openModalName}
            modalContent={this.modals[this.state.openModalName]}
            zoomLevel={this.settings.zoomLevel}
            openMapPicker={this.openMapPicker} />

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
            mapPickerIsOpen={this.state.mapPickerIsOpen}
            closeMapPicker={this.closeMapPicker}
            settings={this.settings} />

        {/* App footer */}
        <Footer userLoggedIn={this.state.userLoggedIn}
            openModalFunction={this.openModal}
            logoutFunction={this.logout} />
      </div>
    );
  }
}