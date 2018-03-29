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
		path: '/users/:id'
	},
	createUser: {
		method: post,
		path: '/users'
	},
	updateUser: {
		method: patch,
		path: '/users/:id'
	},
	destroyUser: {
		method: destroy,
		path: '/users/:id'
	}
};

const config = {
	baseUrl: 'https://lion-uat.herokuapp.com'
};

export default buildApi(apiEndpoints, config);