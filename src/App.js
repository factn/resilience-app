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
/*** [end of imports] ***/

const versionNumber = "0.1.0";

export default class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      mapAPIKey: "AIzaSyD9GQB7QNscXRebrSUzzNf8s5XGrzJSj0w",
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
      "Close": () => this.closeMenu
    };
    this.modals = {
      login: {
        title: "Login",
        body: (
          <form action={() => this.login()} className="login-form">
            <div className="input-wrap">
              <label for="un"></label>
              <input className="login-input" type="text" id="un" />
            </div>
            <div className="input-wrap">
              <label for="pw"></label>
              <input className="login-input" type="password" id="pw" />
            </div>
            <div className="input-wrap">
              <input className="btn submit-btn login-btn" type="submit" onClick={() => this.login()} />
            </div>
          </form>
        )
      },
      preferences: {
        title: "Preferences",
        body: (
          <div className="preferences"></div>
        )
      },
      request: {
        title: "Help!",
        body: (
          <div className="request"></div>
        )
      },
      donate: {
        title: "Donate",
        body: (
          <div className="donation"></div>
        )
      },
      do: {
        title: "Do Work",
        body: (
          <div className="do"></div>
        )
      },
      verify: {
        title: "Verify",
        body: (
          <div className="verification"></div>
        )
      }
    };
    this.actions = {
      "none": {
        "Request": {
          icon: "exclamation",
          method: this.openModal("request")
        }
      },
      "requestor": {
        "Request": {
          icon: "exclamation",
          method: this.openModal("request")
        }
      },
      "donator": {
        "Donate": {
          icon: "credit-card",
          method: this.openModal("donate")
        }
      },
      "doer": {
        "Find Work": {
          icon: "wrench",
          method: this.openModal("do")
        }
      },
      "verifier": {
        "Verify": {
          icon: "eye",
          method: this.openModal("verify")
        }
      },
      "admin": {
        "Request": {
          icon: "exclamation",
          method: this.openModal("request")
        },
        "Donate": {
          icon: "credit-card",
          method: this.openModal("donate")
        },
        "Find Work": {
          icon: "wrench",
          method: this.openModal("do")
        },
        "Verify": {
          icon: "eye",
          method: this.openModal("verify")
        }
      }
    }

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
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
  }
  logout = () => {
    this.setState({
      userLoggedIn: false,
      userFirstName: "",
      currentUserRole: "none"
    });
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
        <Main apiKey={this.state.mapAPIKey} />

        {/* App footer */}
        <Footer actions={this.actions[this.state.currentUserRole]} />
      </div>
    );
  }
}