/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
/*** [end of imports] ***/

export default class FormInput extends Component {
	render () {
		let { formName,
					inputObj } = this.props;
		
		let { inputType, // submit, text, email, password, file, location, number, radio-row
					radios,
					inputID,
					labelPhrase,
					labelIcon,
					requiredField,
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
					<input className="form-input"
							type={inputType}
							id={`${formName}_${inputID}`}
							required={requiredField} />
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
					<input className="form-input"
							type={inputType}
							id={`${formName}_${inputID}`}
							required={requiredField} />
				</div>
			);
		} else if (inputType === "hr") {
			output = <hr />;
		} else if (inputType === "radio-row") {
			output = (
				<div className="radio-row-wrap">
					{radios.map(_index =>
						<div className="input-wrap" key={_index}>
							<input className="form-input"
									type="radio"
									id={`${formName}_${_index.inputID}`} />
							<label className="input-label" htmlFor={`${formName}_${_index.inputID}`}>
								<span className="input-label-phrase">{_index.labelPhrase}</span>
							</label>
						</div>
					)}
				</div>
			);
		} else { // text, email, password, number
			output = (
				<div className="input-wrap">
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input"
							type={inputType}
							id={`${formName}_${inputID}`}
							required={requiredField} />
				</div>
			);
		}

		return output;
	}
}