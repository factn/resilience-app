// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import { rfConfig } from "./config/firebase";

import App from "./App";
import { store } from "./app/store";
import * as serviceWorker from "./serviceWorker";

import Organization from "./app/model/Organization";

import initFirebase from "./initFirebase";

// grab org id from domain or some server side variable
const organizationUid = "1";
Organization.init(organizationUid);

initFirebase();

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
