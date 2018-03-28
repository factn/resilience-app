import {
	buildApi,
	get,
	post,
	patch,
	destroy
} from 'redux-bees';

const apiEndpoints = {
	getPosts: {
		method: get,
		path: '/scenarios'
	},
	getPost: {
		method: get,
		path: '/scenarios/:id'
	},
	createPost: {
		method: post,
		path: '/scenarios'
	},
	updatePost: {
		method: patch,
		path: '/scenarios/:id'
	},
	destroyPost: {
		method: destroy,
		path: '/scenarios/:id'
	}
};

const config = {
	baseUrl: 'https://lion-uat.herokuapp.com/'
};

export default buildApi(apiEndpoints, config);