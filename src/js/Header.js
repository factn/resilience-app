/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import Profile from "./Profile"
/*** [end of imports] ***/

export default class Header extends Component {
	render() {
		let { app } = this.props

		let userInfoArea

		if (app.state.currentUserData.firstname !== "") {
			userInfoArea = (
				<div className="user-info-area">
					<Icon className="user-icon" icon="user" />
					<div className="user-name">
						{toFirstCap(app.state.currentUserData.firstname)}
					</div>
				</div>
			)
		} else {
			userInfoArea = (
				<div className="user-info-area">
					<Icon className="user-icon" icon="question" />
					<div
						className="user-name not-signed-in"
						onClick={() => app.openModal("login")}
					>
						Please sign in
					</div>
				</div>
			)
		}

		return (
			<header className="app-header">
				<nav className="menu">
					<button
						className="btn-lite menu-toggle-btn"
						onClick={() => app.openMenu()}
					>
						<Icon icon="bars" />
					</button>

					<section
						className={
							app.state.menuIsOpen ? "menu-drawer open-drawer" : "menu-drawer"
						}
					>
						{userInfoArea}

						<Profile userData={app.state.currentUserData} />

						<button
							className="menu-close-btn btn-lite"
							onClick={() => app.closeMenu()}
						>
							<Icon icon="times" />
						</button>

						<div className="subheader-content">
							<div className="copy">&copy; {new Date().getFullYear()}</div>
							<div className="version">{app.versionNumber}</div>
						</div>
					</section>
				</nav>

				<h1 className="title">{this.props.title}</h1>
			</header>
		)
	}
}

const toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)
