/*** IMPORTS ***/
// Module imports
import createHistory from "history/createBrowserHistory"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
/*** [end of imports] ***/

const history = createHistory()

export default class EditAccount extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "modal",
			mapPickerIsOpen: false,
			title: "Edit Account",
			navMenu: true,
			userId: 1
		}
		this.inputs = [
			{
				inputType: "scenario-id"
			},
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
				labelPhrase: "New Password",
				labelIcon: "key",
				requiredField: true
			},
			{
				inputType: "password",
				inputID: "confirm-pw",
				labelPhrase: "Confirm New Password",
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
				labelPhrase: "Update Account",
				labelIcon: "save",
				onSubmit: this.submitEditAccount,
				onSubmitParams: {
					scenarioId: "edit-account_scenario-id",
					email: "edit-account_email",
					firstname: "edit-account_first-name",
					lastname: "edit-account_last-name",
					latitude: "edit-account_user-location_lat",
					longitude: "edit-account_user-location_lon",
					password: "edit-account_pw",
					password_confirmation: "edit-account_confirm-pw",
					avatar: "edit-account_profile-photo"
				},
				responseType: "neutral"
			}
		]
	}

	submitEditAccount = params => {
		let json = {
			data: {
				id: params.scenarioId,
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

		Database.updateUser(json)
			.then(result => {
				// console.log("User successfully created:", result)

				history.push("/")
			})
			.catch(error => {
				// console.error("Error creating user:", error)
			})
	}
}
