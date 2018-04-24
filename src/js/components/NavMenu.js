/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"
/*** [end of imports] ***/

export default class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuIsOpen: false
    }
    this.menuItems = [
      {
        label: "Get Help",
        link: "/requester"
      },
      // {
      //   label: "Stories",
      //   link: "/"
      // },
      {
        label: "Profile",
        link: "/profile"
      },
      {
        label: "Log Out",
        link: "/"
      }
    ]

    // Bindings
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

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
    const { menuIsOpen } = this.state

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
                <a href={item.link} className="menu-item-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="subheader-content">
            <div className="copy">&copy; {new Date().getFullYear()}</div>
            <div className="version">0.1.0</div>
          </div>
        </section>
      </nav>
    )
  }
}
