/*** IMPORTS ***/
// Module imports
import React from "react"
import createHistory from "history/createBrowserHistory"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class Login extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
		}
		this.inputs = [
			{
				inputType: "email",
				inputID: "email",
				labelPhrase: "Email",
				labelIcon: "at",
				requiredField: true
			},
			{
				inputType: "password",
				inputID: "pw",
				labelPhrase: "Password",
				labelIcon: "key",
				requiredField: true
			},
			{
				inputType: "submit",
				labelPhrase: "Sign In",
				labelIcon: "sign-in-alt",
				onSubmit: this.submitLogin,
				onSubmitParams: { email: "login_email", password: "login_pw" },
				goToPath: "/",
				responseType: "neutral"
			}
		]
	}

	submitLogin = params => {
		let json = {
			email: params.email,
			password: params.password
		}

		Database.attemptLogin(json)
			.then(result => {
				// console.log("Login complete:", result)

				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error getting user:", error)
			})
	}

	render() {
		let {
			openMapPicker,
			lastClickedLat,
			lastClickedLon,
			scenarioId,
			userId
		} = this.props
		let { lastUrlSegment } = this.state

		return (
			<div className={`${lastUrlSegment}-form page-form`}>
				{this.pages[lastUrlSegment].inputs.map((_input, _index) => (
					<FormInput
						inputObj={_input}
						openMapPicker={openMapPicker}
						lat={lastClickedLat}
						lon={lastClickedLon}
						scenarioId={scenarioId || userId}
						key={_index}
					/>
				))}
			</div>
		)
	}
}
