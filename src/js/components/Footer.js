/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from "react"

// Local JS
import Action from "./Action"
/*** [end of imports] ***/

export default class Footer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userLoggedIn: true // This will be replaced by a fetch call to the server
		}
	}
	componentDidMount = () => {
		// fetch to set state here
	}
	render() {
		return (
			<footer className="app-footer">
				{this.state.userLoggedIn ? (
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
