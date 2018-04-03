/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import Profile from "./Profile"
/*** [end of imports] ***/

export default class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			menuIsOpen: false
		}

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
		let { versionNumber, title, navMenu, currentUserData } = this.props

		return (
			<header className="app-header">
				{navMenu && (
					<nav className="menu">
						<button
							className="btn-lite menu-toggle-btn"
							onClick={() => this.openMenu()}
						>
							<Icon icon="bars" />
						</button>

						<section
							className={
								this.state.menuIsOpen
									? "menu-drawer open-drawer"
									: "menu-drawer"
							}
						>
							{currentUserData.firstname !== "" ? (
								<div className="user-info-area">
									<Icon className="user-icon" icon="user" />
									<div className="user-name">
										{toFirstCap(currentUserData.firstname)}
									</div>
								</div>
							) : (
								<div className="user-info-area">
									<Icon className="user-icon" icon="question" />
									<a className="user-name not-signed-in" href="/login/">
										Please sign in
									</a>
								</div>
							)}

							<Profile userData={currentUserData} />

							<button
								className="menu-close-btn btn-lite"
								onClick={() => this.closeMenu()}
							>
								<Icon icon="times" />
							</button>

							<div className="subheader-content">
								<div className="copy">&copy; {new Date().getFullYear()}</div>
								<div className="version">{versionNumber}</div>
							</div>
						</section>
					</nav>
				)}

				<h1 className="title">{title}</h1>
			</header>
		)
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)
