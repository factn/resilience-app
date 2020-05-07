import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore"; // make sure you add this for firestore
import { firebaseConfig } from "./config/firebase";

let firebaseInstance;

export default function initFirebase(initialState, history) {
  if (firebaseInstance) {
    return firebaseInstance;
  }

  // Initialize firebase instance if it doesn't already exist
  if (!firebaseInstance) {
    const shouldUseEmulator = process.env.REACT_APP_USE_DB_EMULATORS;

    if (shouldUseEmulator === "true") {
      // or window.location.hostname === 'localhost' if you want
      console.log("Using RTDB emulator");
      firebaseConfig.databaseURL = `http://localhost:9000?ns=${firebaseConfig.projectId}`;
    }

    // Initialize Firebase instance
    firebase.initializeApp(firebaseConfig);

    if (shouldUseEmulator === "true") {
      // or window.location.hostname === 'localhost' if you want
      console.log("Using Firestore emulator");
      firebase.firestore().settings({
        host: "localhost:8080",
        ssl: false,
      });
    }
    firebaseInstance = firebase;
  }

  return firebaseInstance;
}
