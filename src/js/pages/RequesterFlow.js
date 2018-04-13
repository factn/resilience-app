/*** IMPORTS ***/
// Module imports
import createHistory from "history/createBrowserHistory"

// Local JS
import Page from "./Page"

// Local JS Utilities
import Database from "../resources/Database"
import { getBase64, unvaluify } from "../resources/Util"
/*** [end of imports] ***/

const history = createHistory()

export default class RequesterFlow extends Page {
	constructor(props) {
		super(props)

		this.state = {
			pageStyle: "flow",
			title: "Get help!",
			navMenu: false,
			userId: 1,
			scenarioId: this.props.match.params.scenarioId || 1
		}
		this.inputs = [
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
					customMessage: "requester_custom-message"
				},
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
									id: relatedEventId
								}
							},
							noun: {
								data: {
									type: "nouns",
									id: relatedNounId
								}
							},
							verb: {
								data: {
									type: "verbs",
									id: relatedVerbId
								}
							},
							requester: {
								data: {
									type: "users",
									id: this.state.userId || "1"
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
						super.acceptScenario({ scenarioId: result.body.data.id })
					})
					.catch(error => {
						// console.error("Error creating scenario:", error)
					})
			}
		}, 100)
	}
	makeNewRequestChildrenScenarios = params => {
		let getMaterials = {
			data: {
				type: "scenarios",
				attributes: {
					funding_goal: "50",
					image: params.image
				},
				relationships: {
					event: {
						data: {
							type: "events",
							id: params.event || "1"
						}
					},
					noun: {
						data: {
							type: "nouns",
							id: "6" // Materials
						}
					},
					verb: {
						data: {
							type: "verbs",
							id: "1" // Get
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
					},
					parent_scenario: {
						data: {
							type: "scenarios",
							id: params.parentScenarioId
						}
					}
				}
			}
		}
		let getTransportation = {
			data: {
				type: "scenarios",
				attributes: {
					funding_goal: "50",
					image: params.image
				},
				relationships: {
					event: {
						data: {
							type: "events",
							id: params.event || "1"
						}
					},
					noun: {
						data: {
							type: "nouns",
							id: "18" // Transportation
						}
					},
					verb: {
						data: {
							type: "verbs",
							id: "1" // Get
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
					},
					parent_scenario: {
						data: {
							type: "scenarios",
							id: params.parentScenarioId
						}
					}
				}
			}
		}
		let findVolunteers = {
			data: {
				type: "scenarios",
				attributes: {
					funding_goal: "50",
					image: params.image
				},
				relationships: {
					event: {
						data: {
							type: "events",
							id: params.event || "1"
						}
					},
					noun: {
						data: {
							type: "nouns",
							id: "17" // Volunteers
						}
					},
					verb: {
						data: {
							type: "verbs",
							id: "3" // Find
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
					},
					parent_scenario: {
						data: {
							type: "scenarios",
							id: params.parentScenarioId
						}
					}
				}
			}
		}
		let childrenId = []

		Database.createScenario(getMaterials)
			.then(result => {
				// console.log("Child scenario 1 successfully created:", result)
				childrenId.push(result.body.data[0].id)
			})
			.catch(error => {
				// console.error("Error creating child scenario:", error)
			})

		Database.createScenario(getTransportation)
			.then(result => {
				// console.log("Child scenario 2 successfully created:", result)
				childrenId.push(result.body.data[0].id)
			})
			.catch(error => {
				// console.error("Error creating child scenario:", error)
			})

		Database.createScenario(findVolunteers)
			.then(result => {
				// console.log("Child scenario 3 successfully created:", result)
				childrenId.push(result.body.data[0].id)
			})
			.catch(error => {
				// console.error("Error creating child scenario:", error)
			})

		let attachChildren = setInterval(() => {
			if (childrenId.length === 3) {
				clearInterval(attachChildren)
				Database.updateScenario({
					data: {
						type: "scenarios",
						id: params.parentScenarioId,
						attributes: {
							children_scenario: childrenId
						}
					}
				})
					.then(result => {
						// console.log("Children scenarios successfully connected to parent:", result)
						
						// history.push(`/${scenarioId}/info`)
					})
					.catch(error => {
						// console.error("Error connecting child scenarios:", error)
					})
			}
		})

		// Database.createProof(json)
		// 	.then(result => {
		// 		// console.log("Proof successfully created:", result)

		// 		this.acceptScenario({ scenarioId: params.scenarioId })
		// 		// history.push(`/${scenarioId}/info`)
		// 	})
		// 	.catch(error => {
		// 		// console.error("Error updating proof:", error)
		// 	})
	}
}
