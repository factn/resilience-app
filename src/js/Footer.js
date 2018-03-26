/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
/*** [end of imports] ***/

export default class Footer extends Component {
	render () {
		let { actions } = this.props;
		
		return (
			<footer className="app-footer">
				{Object.keys(actions).map(_actionName =>
					<button className="btn action-btn" key={_actionName} onClick={actions[_actionName].method}>
						<Icon icon={actions[_actionName].icon} />
					</button>
				)}
			</footer>
		);
	}
}