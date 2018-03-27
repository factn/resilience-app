/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';

// Local JS
import FormInput from './FormInput';
/*** [end of imports] ***/

export default class Modal extends Component {
	render () {
		let { name,
					content,
					inputs } = this.props;
		
		return (
			<article className={`${name.toString().toLowerCase()}-modal modal`}>
				<header className="modal-header">
					<h2>{content.title}</h2>
				</header>
				<div className={`${name.toString().toLowerCase()}-form modal-form`}>
					{inputs.map(_input =>
						<FormInput formName={name}
								inputType={_input.inputType}
								inputID={_input.inputID}
								labelPhrase={_input.labelPhrase}
								labelIcon={_input.labelIcon}
								onSubmit={_input.onSubmit}
								key={_input} />
					)}
				</div>
			</article>
		);
	}
}


inputType
inputID
labelPhrase
labelIcon
onSubmit