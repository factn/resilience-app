/*** IMPORTS ***/
// Module imports
import React, { Component } from 'react';
import Icon from '@fortawesome/react-fontawesome';
import faSolid from '@fortawesome/fontawesome-free-solid';
/*** [end of imports] ***/

export default class FormInput extends Component {
	render () {
		let { formName,
					zoomLevel,
					openMapPicker,
					inputObj } = this.props;
		
		// Valid inputType's: "submit", "text", "email", "password", "file", "location", "number", "radio-row"
		let { inputType,

					// Radio options
					radios,
					radioRowName,

					// Label properties
					labelPhrase,
					labelIcon,

					// HTML tag arguments
					inputID,
					requiredField,
					disabledField,

					// Submit function
					responseType,
					onSubmit,
					onSubmitParams } = inputObj;

		if (inputType === "submit") {
			return (
				<button className={`btn submit-btn ${formName}-btn ${responseType}-response`}
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
			return (
				<div className={disabledField ? "input-wrap disabled-input" : "input-wrap"}>
					<button className="input-label btn btn-label"
							htmlFor={`${formName}_${inputID}`}
							onClick={() => openMapPicker()}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</button>
					<input className="form-input"
							type="number"
							id={`${formName}_${inputID}_lat`}
							hidden={true} />
					<input className="form-input"
							type="number"
							id={`${formName}_${inputID}_lon`}
							hidden={true} />
				</div>
			);
		} else if (inputType === "file") {
			return (
				<div className={disabledField ? "input-wrap disabled-input" : "input-wrap"}>
					<label className="input-label btn btn-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input"
							type={inputType}
							id={`${formName}_${inputID}`}
							required={requiredField}
							disabled={disabledField} />
				</div>
			);
		} else if (inputType === "hr") {
			return <hr />;
		} else if (inputType === "radio-row") {
			return (
				<div className="radio-row-wrap">
					<div className="input-row-label">{labelPhrase}</div>
					{radios.map((_key, i) =>
						<div className="radio-row-input-wrap" key={i}>
							{typeof _key.onChange !== "undefined"
								? <input className="form-input"
										type="radio"
										id={`${formName}_${_key.inputID}`}
										name={radioRowName}
										onChange={() => _key.onChange(_key.onChangeVal)} />
								: <input className="form-input"
										type="radio"
										id={`${formName}_${_key.inputID}`}
										name={radioRowName} />
							}
							<label className="input-label" htmlFor={`${formName}_${_key.inputID}`}>
								<span className="input-label-phrase">{_key.labelPhrase}</span>
							</label>
						</div>
					)}
				</div>
			);
		} else { // text, email, password, number
			return (
				<div className={disabledField ? "input-wrap disabled-input" : "input-wrap"}>
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" &&
							<Icon icon={labelIcon} className="input-label-icon" />
						}
					</label>
					<input className="form-input"
							type={inputType}
							id={`${formName}_${inputID}`}
							required={requiredField}
							disabled={disabledField} />
				</div>
			);
		}
	}
}