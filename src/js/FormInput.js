/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
/*** [end of imports] ***/

export default class FormInput extends Component {
	render () {
		let { formName,
					inputObj } = this.props;
		
		let { inputType, // submit, text, email, password, file, location, number
					inputID,
					labelPhrase,
					labelIcon,
					onSubmit,
					onSubmitParams } = inputObj;
		
		let output;

		if (inputType === "submit") {
			output = (
				<button className={`btn submit-btn ${formName}-btn`}
						type="submit"
						onClick={() => {
							if (typeof onSubmitParams !== "undefined")
								return onSubmit(onSubmitParams)
							
							return onSubmit()
						}}>
					<span className="button-label">{labelPhrase} </span>
					<Icon icon={labelIcon} className="button-icon" />
				</button>
			);
		} else if (inputType === "location") {
			output = (
				<div className="input-wrap">
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input" type={inputType} id={`${formName}_${inputID}`} />
				</div>
			);
		} else if (inputType === "file") {
			output = (
				<div className="input-wrap">
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
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
				<div className="input-wrap">
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input" type={inputType} id={`${formName}_${inputID}`} />
				</div>
			);
		}

		return output;
	}
}