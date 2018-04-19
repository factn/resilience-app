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
        label: "Browse Scenarios",
        link: "/"
      },
      {
        label: "Get Help",
        link: "/"
      },
      {
        label: "Stories",
        link: "/"
      },
      {
        label: "How it Works",
        link: "/"
      },
      {
        label: "Profile",
        link: "/"
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
        <button className="btn-lite menu-toggle-btn" onClick={this.openMenu}>
          <Icon icon="bars" />
        </button>

        <section
          className={menuIsOpen ? "menu-drawer open-drawer" : "menu-drawer"}
        >
          <header className="menu-header">
            <h2 className="menu-header-title">Menu</h2>
            <button
              className="menu-close-btn btn-lite"
              onClick={this.closeMenu}
            >
              <Icon icon="times" />
            </button>
          </header>

          <ul className="menu-list">
            {this.menuItems.map(item => (
              <li className="menu-item" key={item}>
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
