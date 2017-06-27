// @flow

import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import $ from 'jquery'
import Tether from 'tether'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import App from '../shared/app'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'
import authReducer from '../shared/reducer/auth'
import booksReducer from '../shared/reducer/books'
import userSettingsReducer from '../shared/reducer/user-settings'

window.jQuery = $
window.Tether = Tether
require('bootstrap')

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
/* eslint-enable no-underscore-dangle */

const store = createStore(combineReducers(
  { user: authReducer,
    books: booksReducer,
    userSettings: userSettingsReducer,
  }),
  composeEnhancers(applyMiddleware(thunkMiddleware)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)
const wrapApp = (AppComponent, reduxStore) =>
  (<Provider store={reduxStore}>
    <MuiThemeProvider muiTheme={getMuiTheme({ userAgent: navigator.userAgent })}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>)

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // flow-disable-next-line
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
