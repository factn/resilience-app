/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
/*** [end of imports] ***/

export default class Modal extends Component {
	render () {
		let { name,
					content } = this.props;
		
		return (
			<article className={`${name.toString().toLowerCase()}-modal modal`}>
				<header className="modal-header">
					<h2>{content.title}</h2>
				</header>
				{content.body}
			</article>
		);
	}
}


