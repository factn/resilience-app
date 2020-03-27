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

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true,
  },
  dispatch: store.dispatch,
  createFirestoreInstance,
};

if (process.env.NODE_ENV !== "production") {
  var axe = require("react-axe");
  axe(React, ReactDOM, 1000);
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
serviceWorker.unregister();
