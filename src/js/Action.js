/*** IMPORTS ***/
// Module imports
import React, { Component, Fragment }	from 'react';
import Icon														from '@fortawesome/react-fontawesome';
/*** [end of imports] ***/

export default class Action extends Component {
	render() {
		let { label,
					func,
					params,
					icon } = this.props;

		return (
			<div className="action">
				<span className="action-label">{label}</span>
				<button className="btn action-btn" onClick={
							typeof params !== "undefined"
								? () => func(params)
								: () => func()
						}>
					<Icon icon={icon} />
				</button>
			</div>
		);
	}
}