import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import { rfConfig } from "./config/firebase";

import App from "./App";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";

const db = firebase.firestore();
if (process.env.REACT_APP_USE_DB_EMULATORS === "true") {
  console.log("USING FIRESTORE EMULATOR");
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider
      firebase={firebase}
      config={rfConfig}
      dispatch={store.dispatch}
      createFirestoreInstance={createFirestoreInstance}
    >
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
