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

export default class Account extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
		}
		this.inputs = [
			{
				inputType: "text",
				inputID: "first-name",
				labelPhrase: "First Name",
				labelIcon: "id-card",
				requiredField: true
			},
			{
				inputType: "text",
				inputID: "last-name",
				labelPhrase: "Last Name",
				labelIcon: "id-card",
				requiredField: false
			},
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
				inputType: "password",
				inputID: "confirm-pw",
				labelPhrase: "Confirm Password",
				labelIcon: "key",
				requiredField: true
			},
			{
				inputType: "location",
				inputID: "user-location",
				labelPhrase: "Location",
				labelIcon: "map-pin",
				requiredField: false
			},
			{
				inputType: "file",
				inputID: "profile-photo",
				labelPhrase: "Photo",
				labelIcon: "image",
				requiredField: false
			},
			{
				inputType: "submit",
				labelPhrase: "Create Account",
				labelIcon: "user-plus",
				onSubmit: this.submitCreateAccount,
				onSubmitParams: {
					email: "account_email",
					firstname: "account_first-name",
					lastname: "account_last-name",
					latitude: "account_user-location_lat",
					longitude: "account_user-location_lon",
					password: "account_pw",
					password_confirmation: "account_confirm-pw",
					avatar: "account_profile-photo"
				},
				goToPath: "/",
				responseType: "neutral"
			}
		]
	}

	submitCreateAccount = params => {
		let json = {
			data: {
				type: "users",
				attributes: {
					email: params.email,
					firstname: params.firstname,
					lastname: params.lastname,
					latitude: params.latitude,
					longitude: params.longitude,
					password: params.password,
					password_confirmation: params.password_confirmation,
					avatar: params.avatar
				}
			}
		}

		Database.createUser(json)
			.then(result => {
				// console.log("User successfully created:", result)

				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error creating user:", error)
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
