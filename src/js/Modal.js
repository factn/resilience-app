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
					zoomLevel,
					openMapPicker } = this.props;
		
		return (
			<article className={`${name.toString().toLowerCase()}-modal modal`}>
				<header className="modal-header">
					<h2>{content.title}</h2>
				</header>
				
				{typeof content.adContent !== "undefined" &&
					<div className="modal-adcontent-wrap"></div>
				}
				
				{typeof content.customContent !== "undefined" && content.customContent}
				
				<div className={`${name.toString().toLowerCase()}-form modal-form`}>
					{typeof content.inputs !== "undefined" && content.inputs.map(_input =>
						<FormInput formName={name}
								inputObj={_input}
								zoomLevel={zoomLevel}
								openMapPicker={openMapPicker}
								key={_input} />
					)}
				</div>
			</article>
		);
	}
}