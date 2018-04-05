import { buildApi, patch } from "redux-bees"

const imageUploadApiEndpoints = {
	addImageToScenario: {
		method: patch,
		path: "/scenarios/:id"
	}
}

const imageUploadConfig = {
	baseUrl: "https://lion-uat.herokuapp.com",
	configureHeaders(headers) {
		return {
			Accept: "application/vnd.api+json",
			"Content-Type": "multipart/image"
		}
	}
}

export default buildApi(imageUploadApiEndpoints, imageUploadConfig)
