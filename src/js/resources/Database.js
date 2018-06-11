import { buildApi, get, post, patch, destroy } from "redux-bees"

const credentials = "email=admin@example.com&password=password"

const apiEndpoints = {
  // Nouns
  getNouns: {
    method: get,
    path: `/nouns?${credentials}`
  },
  getNoun: {
    method: get,
    path: `/nouns/:description?${credentials}`
  },
  getNounId: {
    method: get,
    path: `/nouns/?filter[description]=:description&?${credentials}`
  },
  createNoun: {
    method: post,
    path: `/nouns?${credentials}`
  },

  // Verbs
  getVerbs: {
    method: get,
    path: `/verbs?${credentials}`
  },
  getVerb: {
    method: get,
    path: `/verbs/:description?${credentials}`
  },
  getVerbId: {
    method: get,
    path: `/verbs/?filter[description]=:description&?${credentials}`
  },
  createVerb: {
    method: post,
    path: `/verbs?${credentials}`
  },

  // Donations
  getDonations: {
    method: get,
    path: `/donations?${credentials}`
  },
  getDonation: {
    method: get,
    path: `/donations/:scenario?${credentials}`
  },
  createDonation: {
    method: post,
    path: `/donations?${credentials}`
  },
  updateDonation: {
    method: patch,
    path: `/donations/:id?${credentials}`
  },
  destroyDonation: {
    method: destroy,
    path: `/donations/:id?${credentials}`
  },

  // Events
  getEvents: {
    method: get,
    path: `/events?${credentials}`
  },
  getEventId: {
    method: get,
    path: `/events/?filter[description]=:description&?${credentials}`
  },
  createEvent: {
    method: post,
    path: `/events?${credentials}`
  },
  updateEvent: {
    method: patch,
    path: `/events/:id?${credentials}`
  },
  destroyEvent: {
    method: destroy,
    path: `/events/:id?${credentials}`
  },

  // Vouches
  getVouches: {
    method: get,
    path: `/vouches?${credentials}`
  },
  createVouch: {
    method: post,
    path: `/vouches?${credentials}`
  },
  updateVouch: {
    method: patch,
    path: `/vouches/:id?${credentials}`
  },
  destroyVouch: {
    method: destroy,
    path: `/vouches/:id?${credentials}`
  },

  // Scenarios
  getScenarios: {
    method: get,
    path: `/scenarios?${credentials}`
  },
  scenarioFeed: {
    method: get,
    path: `/scenarios?sort=-parent_scenario_id,-created_at&page[limit]=21&?${credentials}`
  },
  getScenario: {
    method: get,
    path: `/scenarios/:id?${credentials}`
  },
  createScenario: {
    method: post,
    path: `/scenarios?${credentials}`
  },
  updateScenario: {
    method: patch,
    path: `/scenarios/:id?${credentials}`
  },
  destroyScenario: {
    method: destroy,
    path: `/scenarios/:id?${credentials}`
  },
  dismissScenario: {
    method: patch,
    path: `/scenarios/:id?${credentials}`
  },
  interactWithScenario: {
    method: patch,
    path: `/scenarios/:id?${credentials}`
  },
  getScenarioWithChildren: {
    method: get,
    path: `/scenarios/:id/?include=children_scenario&?${credentials}`
  },
  getScenarioWithVouches: {
    method: get,
    path: `/scenarios/:id/?include=vouches&?${credentials}`
  },

  // Users
  getUsers: {
    method: get,
    path: `/users?${credentials}`
  },
  getUser: {
    method: get,
    path: `/users?filter[email]=:email&?${credentials}`
  },
  getUserById: {
    method: get,
    path: `/users/:id?${credentials}`
  },
  createUser: {
    method: post,
    path: `/users?${credentials}`
  },
  updateUser: {
    method: patch,
    path: `/users/:id?${credentials}`
  },
  destroyUser: {
    method: destroy,
    path: `/users/:id?${credentials}`
  },

  // Scenarios related to users
  getUserDonations: {
    method: get,
    path: `/users/:id/donated?page[limit]=10&?${credentials}`
  },
  getUserDos: {
    method: get,
    path: `/users/:id/done?page[limit]=10&?${credentials}`
  },
  getUserRequests: {
    method: get,
    path: `/users/:id/requested?filter[is_parent]=true&page[limit]=10&?${credentials}`
  },
  getUserVouches: {
    method: get,
    path: `/users/:id/verified?page[limit]=10&?${credentials}`
  },

  // Login
  attemptLogin: {
    method: post,
    path: `/users/sign_in?${credentials}`
  },

  // Ad Types
  getAdTypes: {
    method: get,
    path: `/ad_types?${credentials}`
  },

  // User Ad Interactions
  getUserAdInteractions: {
    method: get,
    path: `/user_ad_interactions?${credentials}`
  },
  createUserAdInteraction: {
    method: post,
    path: `/user_ad_interactions?${credentials}`
  },

  // Interaction Types
  getInteractionTypes: {
    method: get,
    path: `/interaction_types?${credentials}`
  }
}

let baseUrl

if (window.location.hostname === "localhost") {
  console.log("Local host detected, using dev URL")
  baseUrl = "http://localhost:4000"
} else {
  console.info("Live site, using production database")
  baseUrl = "https://lion-uat.herokuapp.com"
}

const config = {
  baseUrl: baseUrl
}

export default buildApi(apiEndpoints, config)
