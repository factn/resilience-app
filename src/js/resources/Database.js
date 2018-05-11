import { buildApi, get, post, patch, destroy } from "redux-bees"

// NOTE: Filtering is now done in 'filterFeed' based on the whole list of scenarios.
// const sharedScenarioCore = "/scenarios";
// const sharedScenarioCore = "/scenarios?sort=-parent_scenario_id,-created_at";
// GOAL: sort with newest scenarios on top, and also filter so that sub-tasks are not shown
// TODO: was not able to filter by (parent_scenario_id != null)..
// ...in theory it should be: {"name":"parent_scenario_id","op":"ne","val":""}... but somewhere this path is being modified... :-( 
// TODO: eventually use: ?sort=accepted-ratio-donator

const apiEndpoints = {
	// Nouns
	getNouns: {
		method: get,
		path: "/nouns"
	},
	getNoun: {
		method: get,
		path: "/nouns/:description"
	},
	getNounId: {
		method: get,
		path: "/nouns/?filter[description]=:description"
	},
	createNoun: {
		method: post,
		path: "/nouns"
	},

	// Verbs
	getVerbs: {
		method: get,
		path: "/verbs"
	},
	getVerb: {
		method: get,
		path: "/verbs/:description"
	},
	getVerbId: {
		method: get,
		path: "/verbs/?filter[description]=:description"
	},
	createVerb: {
		method: post,
		path: "/verbs"
	},

	// Donations
	getDonations: {
		method: get,
		path: "/donations"
	},
	getDonation: {
		method: get,
		path: "/donations/:scenario"
	},
	createDonation: {
		method: post,
		path: "/donations"
	},
	updateDonation: {
		method: patch,
		path: "/donations/:id"
	},
	destroyDonation: {
		method: destroy,
		path: "/donations/:id"
	},

	// Events
	getEvents: {
		method: get,
		path: "/events"
	},
	getEventId: {
		method: get,
		path: "/events/?filter[description]=:description"
	},
	createEvent: {
		method: post,
		path: "/events"
	},
	updateEvent: {
		method: patch,
		path: "/events/:id"
	},
	destroyEvent: {
		method: destroy,
		path: "/events/:id"
	},

	// Proofs
	getProofs: {
		method: get,
		path: "/proofs"
	},
	createProof: {
		method: post,
		path: "/proofs"
	},
	updateProof: {
		method: patch,
		path: "/proofs/:id"
	},
	destroyProof: {
		method: destroy,
		path: "/proofs/:id"
	},

	// Scenarios
	getScenarios: {
		method: get,
		path: "/scenarios"
	},
	scenarioFeed: {
		method: get,
		path: "/scenarios?sort=-parent_scenario_id,-created_at&page[limit]=21" 
	},
	getScenario: {
		method: get,
		path: "/scenarios/:id"
	},
	createScenario: {
		method: post,
		path: "/scenarios"
	},
	updateScenario: {
		method: patch,
		path: "/scenarios/:id"
	},
	destroyScenario: {
		method: destroy,
		path: "/scenarios/:id"
	},
	dismissScenario: {
		method: patch,
		path: "/scenarios/:id"
	},
	interactWithScenario: {
		method: patch,
		path: "/scenarios/:id"
	},
	getScenarioWithChildren: {
		method: get,
		path: "/scenarios/:id/?include=children_scenario"
	},
	getScenarioWithProofs: {
		method: get,
		path: "/scenarios/:id/?include=proofs"
	},

	// Users
	getUsers: {
		method: get,
		path: "/users"
	},
	getUser: {
		method: get,
		path: "/users?filter[email]=:email"
	},
	getUserById: {
		method: get,
		path: "/users/:id"
	},
	createUser: {
		method: post,
		path: "/users"
	},
	updateUser: {
		method: patch,
		path: "/users/:id"
	},
	destroyUser: {
		method: destroy,
		path: "/users/:id"
	},

	// Scenarios related to users
	getUserDonations: {
		method: get,
		path: "/users/:id/donated?page[limit]=10"
	},
	getUserDos: {
		method: get,
		path: "/users/:id/done?page[limit]=10"
	},
	getUserRequests: {
		method: get,
		path: "/users/:id/requested?filter[is_parent]=true&page[limit]=10"
	},
	getUserVerifications: {
		method: get,
		path: "/users/:id/verified?page[limit]=10"
	},

	// Login
	attemptLogin: {
		method: post,
		path: "/users/sign_in"
	},

	// Ad Types
	getAdTypes: {
		method: get,
		path: "/ad_types"
	},

	// User Ad Interactions
	getUserAdInteractions: {
		method: get,
		path: "/user_ad_interactions"
	},
	createUserAdInteraction: {
		method: post,
		path: "/user_ad_interactions"
	},

	// Interaction Types
	getInteractionTypes: {
		method: get,
		path: "/interaction_types"
	}
}

// Removing the test URL for the demo. This will go back in, but we're close enough that we should be able to use the live database

// let baseUrl

// if (window.location.hostname === "localhost") {
// 	console.log("Local host detected, using dev URL")
// 	baseUrl = "http://localhost:4000"
// } else {
// 	console.info("Live site, using production database")
// 	baseUrl = "https://lion-uat.herokuapp.com"
// }

const config = {
	baseUrl: "https://lion-uat.herokuapp.com" // baseUrl
}

export default buildApi(apiEndpoints, config)
