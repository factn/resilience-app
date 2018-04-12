/*** IMPORTS ***/
// Module imports
import React from "react"
import createHistory from "history/createBrowserHistory"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece, getBase64 } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class VerifierFlow extends Form {
	constructor(props) {
		super(props)

		this.state = {
			lastUrlSegment: getUrlPiece()
		}
		this.inputs = [
			{
				inputType: "scenario-id"
			},
			{
				inputType: "file",
				inputID: "proof",
				labelPhrase: "Upload proof",
				labelIcon: "image",
				requiredField: false
			},
			{
				inputType: "submit",
				labelPhrase: "Verify this user",
				labelIcon: "check",
				onSubmit: this.submitVerification,
				onSubmitParams: {
					scenarioId: "verifier_scenario-id",
					image: "verifier_proof"
				},
				goToPath: "/verifier",
				responseType: "positive"
			},
			{
				inputType: "submit",
				labelPhrase: "I don't know them",
				labelIcon: "times",
				onSubmit: this.dismissScenario,
				onSubmitParams: {
					scenarioId: "verifier_scenario-id"
				},
				goToPath: scenarioId => `/${scenarioId}/info`,
				responseType: "negative"
			}
		]
	}

	submitVerification = params => {
		let image_string = getBase64(params.image)

		let json = {
			data: {
				type: "proofs",
				attributes: {
					image: image_string
				},
				relationships: {
					scenario: {
						data: {
							type: "scenarios",
							id: params.scenarioId
						}
					}
				}
			}
		}

		Database.createProof(json)
			.then(result => {
				// console.log("Proof successfully created:", result)

				this.acceptScenario({ scenarioId: params.scenarioId })
				if (params.path) {
					history.push(params.path)
					window.location = params.path
				}
			})
			.catch(error => {
				// console.error("Error updating proof:", error)
			})
	}
	dismissScenario = params => {
		let { lastUrlSegment } = this.state
		let ad_type

		if (lastUrlSegment === "doer") ad_type = "1"
		else if (lastUrlSegment === "requester") ad_type = "2"
		else if (lastUrlSegment === "donator") ad_type = "3"
		else if (lastUrlSegment === "verifier") ad_type = "4"

		let json = {
			data: {
				type: "user_ad_interactions",
				attributes: {},
				relationships: {
					user: {
						data: {
							type: "users",
							id: "1"
						}
					},
					scenario: {
						data: {
							id: params.scenarioId,
							type: "scenarios"
						}
					},
					ad_type: {
						data: {
							id: ad_type,
							type: "ad_types"
						}
					},
					interaction_type: {
						data: {
							id: "2",
							type: "interaction_types"
						}
					}
				}
			}
		}

		Database.createUserAdInteraction(json)
			.then(result => {
				// console.log("User ad interaction successfully created:", result)
			})
			.catch(error => {
				// console.error("Error creating user ad interaction:", error)
			})
	}
	acceptScenario = params => {
		let { lastUrlSegment } = this.state
		let ad_type

		if (lastUrlSegment === "doer") ad_type = "1"
		else if (lastUrlSegment === "requester") ad_type = "2"
		else if (lastUrlSegment === "donator") ad_type = "3"
		else if (lastUrlSegment === "verifier") ad_type = "4"

		let json = {
			data: {
				type: "user_ad_interactions",
				attributes: {},
				relationships: {
					user: {
						data: {
							type: "users",
							id: "1"
						}
					},
					scenario: {
						data: {
							id: params.scenarioId,
							type: "scenarios"
						}
					},
					ad_type: {
						data: {
							id: ad_type,
							type: "ad_types"
						}
					},
					interaction_type: {
						data: {
							id: "1",
							type: "interaction_types"
						}
					}
				}
			}
		}

		Database.createUserAdInteraction(json)
			.then(result => {
				// console.log("User ad interaction successfully created:", result)
			})
			.catch(error => {
				// console.error("Error creating user ad interaction:", error)
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
