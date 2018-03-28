/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
// import faSolid from '@fortawesome/fontawesome-free-solid';
/*** [end of imports] ***/

export default class Loader extends Component {
	render () {
		return (
			<div className="loader-wrap">
				<div className="loader">
					<Icon icon="circle" className="loader-icon" />
					<Icon icon="circle" className="loader-icon" />
					<Icon icon="circle" className="loader-icon" />
				</div>
			</div>
		);
	}
}