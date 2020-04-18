// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore"; // <- needed if using firestore
import App from "./App";
import { store } from "./app/store";
import { firebaseConfig } from "./config/firebase";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  firebase
    .firestore()
    .enablePersistence()
    .catch(function (err) {
      if (err.code == "failed-precondition") {
        alert("one tab open only please")
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == "unimplemented") {
        alert("this browser does not support this")
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
  axe(React, ReactDOM, 5000);
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
