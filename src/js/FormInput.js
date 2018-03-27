/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
/*** [end of imports] ***/

export default class FormInput extends Component {
	render () {
		let { formName,
					inputType, // submit, text, email, password, file, location, number
					inputID,
					labelPhrase,
					labelIcon,
					onSubmit } = this.props;

		let output;

		if (inputType !== "submit") {
			output = (
				<div className="input-wrap">
					<label className="input-label" for={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input" type={inputType} id={`${formName}_${inputID}`} />
				</div>
			);
		} else {
			output = (
				<button className={`btn submit-btn ${formName}-btn`} type="submit" onClick={() => onSubmit()}>
					<span className="button-label">{labelPhrase} </span>
					<Icon icon={labelIcon} className="button-icon" />
				</button>
			);
		}

		return output;
	}
}