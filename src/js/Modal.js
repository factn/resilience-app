/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import FormInput from './FormInput';
/*** [end of imports] ***/

export default class Modal extends Component {
	render () {
		let { name, content } = this.props;
		
		return (
			<article className={`${name.toString().toLowerCase()}-modal modal`}>
				<header className="modal-header">
					<h2>{content.title}</h2>
				</header>
				{typeof content.adContent !== "undefined" &&
					<div className="modal-adcontent-wrap"></div>
				}
				<div className={`${name.toString().toLowerCase()}-form modal-form`}>
					{content.inputs.map(_input => <FormInput formName={name} inputObj={_input} key={_input} />)}
				</div>
			</article>
		);
	}
}