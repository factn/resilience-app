/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import Icon from "@fortawesome/react-fontawesome"

// Local JS
import Database from "../resources/Database"
import { toFirstCap } from "../resources/Util"
/*** [end of imports] ***/

export default class Header extends Component {
	constructor(props) {
		super(props)

		this.state = {
			menuIsOpen: this.props.menuIsOpen || false,
			currentUserData: null
		}

		// Bindings
		this.openMenu = this.openMenu.bind(this)
		this.closeMenu = this.closeMenu.bind(this)
	}

	componentDidMount = () => {
		Database.getUser({ id: this.props.userId })
			.then(result => {
				// console.log("User successfully found:", result)
				this.setState({
					currentUserData: result.body.data[0].attributes
				})
			})
			.catch(error => {
				// console.error("Error getting user:", error)
				this.setState({
					currentUserData: null
				})
			})
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
		const { menuIsOpen, currentUserData } = this.state

		return (
			<nav className="menu">
				<button
					className="btn-lite menu-toggle-btn"
					onClick={this.openMenu}
				>
					<Icon icon="bars" />
				</button>

				<section
					className={menuIsOpen ? "menu-drawer open-drawer" : "menu-drawer"}
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

					{this.props.children}

					<button
						className="menu-close-btn btn-lite"
						onClick={this.closeMenu}
					>
						<Icon icon="times" />
					</button>

					<div className="subheader-content">
						<div className="copy">&copy; {new Date().getFullYear()}</div>
						<div className="version">0.1.0</div>
					</div>
				</section>
			</nav>
		)
	}
}
