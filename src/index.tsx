// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "./index.css";

import * as firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore

import App from "./App";
import { store } from "./app/store";
import { firebaseConfig } from "./config/firebase";
import * as serviceWorker from "./serviceWorker";

import Organization from "./app/model/Organization";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
// grab org id from domain or some server side variable
const organizationId = "1";
Organization.init(organizationId);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

if (process.env.NODE_ENV !== "production") {
  firebase
    .firestore()
    .enablePersistence({ synchronizeTabs: true })
    .catch(function (err) {
      if (err.code === "failed-precondition") {
        alert("one tab open only please");
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code === "unimplemented") {
        alert("this browser does not support this");
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
