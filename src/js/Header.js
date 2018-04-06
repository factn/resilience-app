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

		this.flows = {
			requester: {
				title: "Help!",
				navMenu: false
			},
			donator: {
				title: "Donate",
				navMenu: false
			},
			doer: {
				title: "Work",
				navMenu: false
			},
			verifier: {
				title: "Verify",
				navMenu: false
			},
			else: {
				title: this.props.title,
				navMenu: this.props.navMenu
			}
		}
		this.state = {
			menuIsOpen: false,
			currentUserData: {
				// This will be replaced with a fetch to check the server
				email: "admin@example.com",
				firstname: "John",
				lastname: "Johnson",
				latitude: -41.280789,
				longitude: 174.775187
			}
		}

		// Bindings
		this.openMenu = this.openMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
	}
	componentDidMount = () => {
		// fetch and set state happens here for user data
	}

	getUrlPiece = () => {
		let currentUrl = window.location.href.split("/")

		let lastUrlSegment =
			currentUrl[currentUrl.length - 1] !== ""
				? currentUrl[currentUrl.length - 1]
				: currentUrl[currentUrl.length - 2]

		let allowed = [
			"donator",
			"requester",
			"verifier",
			"doer",
			"login",
			"thanks",
			"account",
			"edit-account",
			"preferences"
		]

		if (allowed.indexOf(lastUrlSegment) === -1) return "donator"
		else return lastUrlSegment
	}
	toFirstCap = str => str.charAt(0).toUpperCase() + str.slice(1)

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
		let title = this.props.title
		let navMenu = this.props.navMenu

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
							{this.state.currentUserData.firstname !== "" ? (
								<div className="user-info-area">
									<Icon className="user-icon" icon="user" />
									<div className="user-name">
										{this.toFirstCap(this.state.currentUserData.firstname)}
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

							<Profile userData={this.state.currentUserData} />

							<button
								className="menu-close-btn btn-lite"
								onClick={() => this.closeMenu()}
							>
								<Icon icon="times" />
							</button>

							<div className="subheader-content">
								<div className="copy">&copy; {new Date().getFullYear()}</div>
								<div className="version">0.1.0</div>
							</div>
						</section>
					</nav>
				)}

				<h1 className="title">{title}</h1>
			</header>
		)
	}
}
