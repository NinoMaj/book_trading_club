// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import authReducer from '../shared/reducer/auth'
import booksReducer from '../shared/reducer/books'
import userSettingsReducer from '../shared/reducer/user-settings'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
  }

  return createStore(combineReducers({
    user: authReducer,
    books: booksReducer,
    userSettings: userSettingsReducer,
  }),
    preloadedState,
    applyMiddleware(thunkMiddleware))
}

export default initStore
