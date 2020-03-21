// External
import { createStore, applyMiddleware, compose } from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory'

import rootReducer from './Reducer'

const history = createHistory()

const enhancers = []
const middleware = [
  thunk,
  routerMiddleware(history)
]

const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
}
const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
)
const store = createStore(
  rootReducer,
  {},// initial state
  composedEnhancers
)

export {store, history}
