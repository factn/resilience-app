/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import { Link } from "react-router-dom"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class Header extends Component {
  state = {
    copyDate: new Date().getFullYear(),
    menuIsOpen: false
  }
  menuItems = [
    {
      label: "Get Help",
      link: "/requester"
    },
    {
      label: "Profile",
      link: "/profile"
    },
    {
      label: "Log Out",
      link: "/"
    }
  ]

  openMenu = () => {
    this.setState({
      menuIsOpen: true
    })
  }
  closeMenu = () => {
    this.setState({
      menuIsOpen: false
    })
  }

  render() {
    const { menuIsOpen, copyDate } = this.state

    return (
      <nav className="menu">
        <div className="menu-toggle-btn" onClick={this.openMenu}>
          <Icon icon="bars" />
        </div>

        <section
          className={menuIsOpen ? "menu-drawer open-drawer" : "menu-drawer"}
        >
          <header className="menu-header">
            <h2 className="menu-header-title">Menu</h2>
            <div className="menu-close-btn" onClick={this.closeMenu}>
              <Icon icon="times" />
            </div>
          </header>

          <ul className="menu-list">
            {this.menuItems.map(item => (
              <li className="menu-item" key={item.label}>
                <Link to={item.link} className="menu-item-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="subheader-content">
            <div className="copy">&copy; {copyDate}</div>
            <div className="version">0.1.0</div>
          </div>
        </section>
      </nav>
    )
  }
}
