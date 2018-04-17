/*** IMPORTS ***/
// Module imports
import { faImage, faCheck, faTimes } from "@fortawesome/fontawesome-free-solid"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64 } from "../resources/Util"
/*** [end of imports] ***/

export default class VerifierFlow extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Verify",
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1
		}
		this.inputs = [
			{
				inputType: "file",
				inputID: "proof",
				labelPhrase: "Upload proof",
				labelIcon: faImage,
				requiredField: false
			},
			{
				inputType: "submit",
				labelPhrase: "Verify this user",
				labelIcon: faCheck,
				onSubmit: this.submitVerification,
				onSubmitParams: {
					image: "verifier_proof"
				},
				responseType: "positive"
			},
			{
				inputType: "submit",
				labelPhrase: "I don't know them",
				labelIcon: faTimes,
				onSubmit: super.dismissScenario,
				responseType: "negative"
			}
		]
	}

	submitVerification = params => {
		const { scenarioId } = this.state

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
							id: scenarioId
						}
					},
					verifier: {
						data: {
							type: "users",
							id: this.state.userId || "1"
						}
					}
				}
			}
		}

		Database.createProof(json)
			.then(result => {
				// console.log("Proof successfully created:", result)

				super.acceptScenario({ scenarioId: scenarioId })
				this.props.history.push(`/${scenarioId}/info`)
			})
			.catch(error => {
				// console.error("Error updating proof:", error)
			})
	}
}
