import {
	buildApi,
	get,
	post,
	patch,
	destroy
} from 'redux-bees';

const apiEndpoints = {
	// Scenarios
	getScenarios: {
		method: get,
		path: '/scenarios'
	},
	getScenario: {
		method: get,
		path: '/scenarios/:id'
	},
	createScenario: {
		method: post,
		path: '/scenarios'
	},
	updateScenario: {
		method: patch,
		path: '/scenarios/:id'
	},
	destroyScenario: {
		method: destroy,
		path: '/scenarios/:id'
	},

	// Users
	getUsers: {
		method: get,
		path: '/users'
	},
	getUser: {
		method: get,
		path: '/users/:attributes:email'
	},
	createUser: {
		method: post,
		path: '/users'
	},
	updateUser: {
		method: patch,
		path: '/users/:attributes:email'
	},
	destroyUser: {
		method: destroy,
		path: '/users/:attributes:email'
	}
};

const config = {
	baseUrl: 'https://lion-uat.herokuapp.com/'
};

export default buildApi(apiEndpoints, config);