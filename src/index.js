// Modules
import React from "react"
import ReactDOM from "react-dom"

// Local JS
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()
