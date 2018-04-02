/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Action from "./Action"
/*** [end of imports] ***/

export default class Footer extends Component {
	render() {
		let { app } = this.props

		return (
			<footer className="app-footer">
				{app.state.userLoggedIn ? (
					<Fragment>
						<Action label="Log Out" icon="sign-out-alt" />
						<Action label="Settings" link={"/preferences/"} icon="cogs" />
						<Action label="Help!" link={"/requestor/"} icon="exclamation" />
					</Fragment>
				) : (
					<Fragment>
						<Action label="Sign Up" link={"/account/"} icon="user-plus" />
						<Action label="Log In" link={"/login/"} icon="user" />
						<Action label="Settings" link={"/preferences/"} icon="cogs" />
						<Action label="Help!" link={"/requestor/"} icon="exclamation" />
					</Fragment>
				)}
			</footer>
		)
	}
}
