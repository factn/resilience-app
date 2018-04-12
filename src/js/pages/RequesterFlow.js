/*** IMPORTS ***/
// Module imports
import React from "react"

// Local JS
import Form from '../components/Form'
import FormInput from "./FormInput"
import Database from "../resources/Database"
import { getUrlPiece, getBase64, unvaluify } from "../resources/Util"
/*** [end of imports] ***/

export default class RequesterFlow extends Form {
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
				inputType: "select",
				inputID: "event-name",
				labelPhrase: "What disaster has effected you?",
				labelIcon: "cloud",
				options: [],
				requiredField: false
			},
			{
				inputType: "split-input",
				labelPhrase: "What do you need help with?",
				requiredField: true,
				inputs: [
					{
						inputType: "select",
						inputID: "verb",
						options: [],
						requiredField: false
					},
					{
						inputType: "select",
						inputID: "noun",
						options: [],
						requiredField: false
					}
				]
			},
			{
				inputType: "text",
				inputID: "first-name",
				labelPhrase: "What is your name?",
				labelIcon: "user",
				requiredField: false
			},
			{
				inputType: "file",
				inputID: "photo",
				labelPhrase: "Show us what happened",
				labelIcon: "image",
				requiredField: false
			},
			{
				inputType: "location",
				inputID: "location",
				labelPhrase: "Where are you?",
				labelIcon: "map-pin",
				requiredField: true
			},
			{
				inputType: "text",
				inputID: "custom-message",
				labelPhrase: "Anything else you'd like to say?",
				labelIcon: "i-cursor",
				requiredField: false
			},
			{
				inputType: "submit",
				labelPhrase: "Send someone",
				labelIcon: "check",
				onSubmit: this.submitRequest,
				onSubmitParams: {
					event: "requester_event-name",
					image: "requester_photo",
					requester_firstname: "requester_first-name",
					requesterlat: "requester_location_lat",
					requesterlon: "requester_location_lon",
					noun: "requester_noun",
					verb: "requester_verb",
					customMessage: "requester_custom-message",
					scenarioId: "requester_scenario-id"
				},
				goToPath: scenarioId => `/${scenarioId}/info`,
				responseType: "neutral"
			}
		]
	}

	submitRequest = params => {
		let relatedEventId
		let relatedNounId
		let relatedVerbId
		let imageString = getBase64(params.image)

		Database.getEventId({ description: unvaluify(params.event) })
			.then(result => {
				// console.log("Event successfully found:", result)
				relatedEventId = result.body.data[0].id
			})
			.catch(error => {
				// console.error("Error finding event:", error)
				relatedEventId = "1"
			})

		Database.getNounId({ description: unvaluify(params.noun) })
			.then(result => {
				// console.log("Noun successfully found:", result)
				relatedNounId = result.body.data[0].id
			})
			.catch(error => {
				// console.error("Error finding noun:", error)
				relatedNounId = "1"
			})

		Database.getVerbId({ description: unvaluify(params.verb) })
			.then(result => {
				// console.log("Verb successfully found:", result)
				relatedVerbId = result.body.data[0].id
			})
			.catch(error => {
				// console.error("Error finding verb:", error)
				relatedVerbId = "1"
			})

		let getIds = setInterval(() => {
			if (relatedEventId && relatedNounId && relatedVerbId) {
				clearInterval(getIds)
				let json = {
					data: {
						type: "scenarios",
						attributes: {
							funding_goal: "50",
							image: imageString
						},
						relationships: {
							event: {
								data: {
									type: "events",
									id: relatedEventId || "1"
								}
							},
							noun: {
								data: {
									type: "nouns",
									id: relatedNounId || "1"
								}
							},
							verb: {
								data: {
									type: "verbs",
									id: relatedVerbId || "1"
								}
							},
							requester: {
								data: {
									type: "users",
									id: this.state.currentUserId || "1"
								}
							},
							doer: {
								data: {
									type: "users",
									id: "1"
								}
							}
						}
					}
				}

				Database.createScenario(json)
					.then(result => {
						// console.log("Scenario successfully created:", result)

						this.makeNewRequestChildrenScenarios({
							parentScenarioId: result.body.data.id,
							image: imageString,
							event: relatedEventId,
							path: params.path || "/"
						})
						this.acceptScenario({ scenarioId: result.body.data.id })
					})
					.catch(error => {
						// console.error("Error creating scenario:", error)
					})
			}
		}, 100)
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
