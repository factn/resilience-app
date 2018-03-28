/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment } from 'react';
import Icon from '@fortawesome/react-fontawesome';
/*** [end of imports] ***/

export default class Footer extends Component {
	render () {
		let { userLoggedIn,
					openModalFunction,
					logoutFunction } = this.props;
		
		return (
			<footer className="app-footer">
				{userLoggedIn
					? <div className="action">
							<span className="action-label">Log Out</span>
							<button className="btn action-btn" onClick={() => logoutFunction()}>
								<Icon icon="sign-out-alt" />
							</button>
						</div>
					: <div className="action">
							<span className="action-label">Log In</span>
							<button className="btn action-btn" onClick={() => openModalFunction("login")}>
								<Icon icon="user" />
							</button>
						</div>
				}
				<div className="action">
					<span className="action-label">Settings</span>
					<button className="btn action-btn" onClick={() => openModalFunction("preferences")}>
						<Icon icon="cogs" />
					</button>
				</div>
				<div className="action">
					<span className="action-label">Help!</span>
					<button className="btn action-btn" onClick={() => openModalFunction("request")}>
						<Icon icon="exclamation" />
					</button>
				</div>
			</footer>
		);
	}
}