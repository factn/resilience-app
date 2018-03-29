/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from 'react';

// Local JS
import Action from './Action';
/*** [end of imports] ***/

export default class Footer extends Component {
	render () {
		let { userLoggedIn,
					openModal,
					logoutFunction } = this.props;
		
		return (
			<footer className="app-footer">
				{userLoggedIn
					? <Action label="Log Out"
								func={logoutFunction}
								icon="sign-out-alt" />
					: <Fragment>
							<Action label="Sign Up"
									func={openModal}
									params={"account"}
									icon="user-plus" />
							<Action label="Log In"
									func={openModal}
									params={"login"}
									icon="user" />
						</Fragment>
				}
				<Action label="Settings"
						func={openModal}
						params={"preferences"}
						icon="cogs" />
				<Action label="Help!"
						func={openModal}
						params={"request"}
						icon="exclamation" />
			</footer>
		);
	}
}