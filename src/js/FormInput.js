/*** IMPORTS ***/
// Module imports
import React, { Component } from "react"
import createHistory from "history/createBrowserHistory"
import Icon from "@fortawesome/react-fontawesome"
import faSolid from "@fortawesome/fontawesome-free-solid"

// Local JS
import CustomJSX from "./CustomJSX"
/*** [end of imports] ***/

const history = createHistory()

export default class FormInput extends Component {
	getUrlPiece = () => {
		let currentUrl = window.location.href.split("/")

		let lastUrlSegment =
			currentUrl[currentUrl.length - 1] !== ""
				? currentUrl[currentUrl.length - 1]
				: currentUrl[currentUrl.length - 2]

		let allowed = [
			"donator",
			"requester",
			"verifier",
			"doer",
			"login",
			"thanks",
			"account",
			"edit-account",
			"preferences"
		]

		if (allowed.indexOf(lastUrlSegment) === -1) return "donator"
		else return lastUrlSegment
	}
	render() {
		let { openMapPicker, inputObj, lat, lon, scenarioId } = this.props

		/* Valid inputType's:
		 * 	"submit", "text", "email", "password", "file",
		 * 	"location", "number", "radio-row", "custom",
		 * 	"select", "split-input", "scenario-id"
		 */
		let {
			inputType,

			// Radio row
			radios,
			radioRowName,

			// Label properties
			labelPhrase,
			labelIcon,

			// Select
			options,

			// Split input row
			inputs,

			// HTML tag arguments
			inputID,
			requiredField,
			disabledField,

			// Submit function
			responseType,
			onSubmit,
			onSubmitParams,
			goToPath,

			// Full custom
			customJSX
		} = inputObj
		let formName = this.getUrlPiece()

		if (inputType === "submit") {
			return (
				<button
					className={`btn submit-btn ${responseType}-response`}
					onClick={() => {
						if (typeof onSubmit !== "undefined") {
							if (typeof onSubmitParams !== "undefined") {
								let values = {}
								let field

								for (let i in onSubmitParams) {
									field = document.getElementById(onSubmitParams[i])
									if (field.type === "radio" || field.type === "checkbox")
										values[i] = field.checked
									else values[i] = field.value
								}

								onSubmit(values)
							} else onSubmit()
						}

						if (typeof goToPath !== "undefined") history.push(goToPath)
					}}
				>
					<span className="button-label">{labelPhrase} </span>
					<Icon icon={labelIcon} className="button-icon" />
				</button>
			)
		} else if (inputType === "location") {
			return (
				<div
					className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
				>
					<button
						className="input-label btn btn-label"
						htmlFor={`${formName}_${inputID}`}
						onClick={() => openMapPicker()}
					>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" && (
							<Icon icon={labelIcon} className="input-label-icon" />
						)}
					</button>
					<input
						className="form-input"
						type="number"
						id={`${formName}_${inputID}_lat`}
						value={lat || 0}
						hidden={true}
					/>
					<input
						className="form-input"
						type="number"
						id={`${formName}_${inputID}_lon`}
						value={lon || 0}
						hidden={true}
					/>
				</div>
			)
		} else if (inputType === "file") {
			return (
				<div
					className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
				>
					<label
						className="input-label btn btn-label"
						htmlFor={`${formName}_${inputID}`}
					>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" && (
							<Icon icon={labelIcon} className="input-label-icon" />
						)}
					</label>
					<input
						className="form-input"
						type={inputType}
						id={`${formName}_${inputID}`}
						accept="image/*"
						required={requiredField}
						disabled={disabledField}
					/>
				</div>
			)
		} else if (inputType === "hr") {
			return <hr />
		} else if (inputType === "radio-row") {
			return (
				<div className="radio-row-wrap">
					<div className="input-row-label">{labelPhrase}</div>
					{radios.map((_key, i) => (
						<div className="radio-row-input-wrap" key={i}>
							{typeof _key.onChange !== "undefined" ? (
								<input
									className="form-input"
									type="radio"
									id={`${formName}_${_key.inputID}`}
									name={radioRowName}
									onChange={() => _key.onChange(_key.onChangeVal)}
								/>
							) : (
								<input
									className="form-input"
									type="radio"
									id={`${formName}_${_key.inputID}`}
									name={radioRowName}
								/>
							)}
							<label
								className="input-label"
								htmlFor={`${formName}_${_key.inputID}`}
							>
								<span className="input-label-phrase">{_key.labelPhrase}</span>
							</label>
						</div>
					))}
				</div>
			)
		} else if (inputType === "custom") {
			return <CustomJSX content={customJSX} disabledField={disabledField} />
		} else if (inputType === "checkbox") {
			return (
				<div
					className={
						disabledField
							? "input-wrap checkbox-input-wrap disabled-input"
							: "input-wrap checkbox-input-wrap"
					}
				>
					<input
						className="form-input"
						type="checkbox"
						id={`${formName}_${inputID}`}
						required={requiredField}
						disabled={disabledField}
					/>
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" && (
							<Icon icon={labelIcon} className="input-label-icon" />
						)}
					</label>
				</div>
			)
		} else if (inputType === "select") {
			return (
				<div
					className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
				>
					{labelPhrase && (
						<label className="input-label" htmlFor={`${formName}_${inputID}`}>
							<span className="input-label-phrase">{labelPhrase}</span>
							{typeof labelIcon !== "undefined" && (
								<Icon icon={labelIcon} className="input-label-icon" />
							)}
						</label>
					)}
					<select
						className="form-input"
						id={`${formName}_${inputID}`}
						required={requiredField}
						disabled={disabledField}
					>
						<option>[Select]</option>
						{options.map(_option => (
							<option value={valuify(_option)} key={_option}>
								{_option}
							</option>
						))}
					</select>
				</div>
			)
		} else if (inputType === "split-input") {
			return (
				<div
					className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
				>
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" && (
							<Icon icon={labelIcon} className="input-label-icon" />
						)}
					</label>
					<div className="split-input-wrap">
						{inputs.map((_input, _index) => (
							<FormInput
								formName={formName}
								inputObj={_input}
								openMapPicker={openMapPicker}
								lat={lat}
								lon={lon}
								key={_index}
							/>
						))}
					</div>
				</div>
			)
		} else if (inputType === "scenario-id") {
			return (
				<div className="input-wrap disabled-input">
					<input
						className="form-input"
						type="text"
						id={`${formName}_scenario-id`}
						disabled
						value={scenarioId}
					/>
				</div>
			)
		} else {
			// text, email, password, number
			return (
				<div
					className={disabledField ? "input-wrap disabled-input" : "input-wrap"}
				>
					<label className="input-label" htmlFor={`${formName}_${inputID}`}>
						<span className="input-label-phrase">{labelPhrase}</span>
						{typeof labelIcon !== "undefined" && (
							<Icon icon={labelIcon} className="input-label-icon" />
						)}
					</label>
					<input
						className="form-input"
						type={inputType}
						id={`${formName}_${inputID}`}
						required={requiredField}
						disabled={disabledField}
					/>
				</div>
			)
		}
	}
}

const valuify = str => {
	let words = str.split(" ")
	let ret = []

	for (let i = 0, l = words.length; i < l; i++) {
		ret.push(words[i].toLowerCase())
	}

	return ret.join("-")
}
