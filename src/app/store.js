import { firebaseReducer } from "react-redux-firebase";
import { combineReducers, createStore } from "redux";
import { firestoreReducer } from "redux-firestore";

// Add firebase to reducers
export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Create store with reducers and initial state
export const initialState = {};
export const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
