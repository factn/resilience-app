// Modules
import React from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"

// Local JS
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
)
registerServiceWorker()
