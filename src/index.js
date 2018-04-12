// Modules
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import createHistory from "history/createBrowserHistory"

// Local JS
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

// Styles
import "./index.css"

const history = createHistory()

ReactDOM.render(
	<Router history={history} routes={App} />,
	document.getElementById("root")
)
registerServiceWorker()
