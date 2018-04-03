/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Action from "./Action"
/*** [end of imports] ***/

export default class Footer extends Component {
	render() {
		let { userLoggedIn } = this.props

		return (
			<footer className="app-footer">
				{userLoggedIn ? (
					<Action label="Log Out" link={"/login/"} icon="sign-out-alt" />
				) : (
					<Fragment>
						<Action label="Sign Up" link={"/account/"} icon="user-plus" />
						<Action label="Log In" link={"/login/"} icon="user" />
					</Fragment>
				)}
				<Action label="Settings" link={"/preferences/"} icon="cogs" />
				<Action label="Help!" link={"/requester/"} icon="exclamation" />
			</footer>
		)
	}
}
