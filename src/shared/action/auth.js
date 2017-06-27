// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { AUTH_LOGIN_ROUTE } from '../../shared/routes'
import Auth from '../Auth'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_CHECK = 'LOGIN_CHECK'
export const LOGOUT = 'LOGOUT'

export const loginRequest = createAction(LOGIN_REQUEST)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const loginFailure = createAction(LOGIN_FAILURE)
export const loginCheck = createAction(LOGIN_CHECK)
export const logoutAction = createAction(LOGOUT)
export const logout = () => (dispatch: Function) => {
  Auth.deauthenticateUser()
  dispatch(logoutAction())
}

export const login = (form: Object, history: Object) => (dispatch: Function) => {
  dispatch(loginRequest())
  return fetch(AUTH_LOGIN_ROUTE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((data) => {
      if (!data.success) throw Error('No message received')
      dispatch(loginSuccess({
        logged: true,
        email: data.user.email,
        name: data.user.name,
      }))
      Auth.authenticateUser(data.token)
      history.push('/')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error)
      dispatch(loginFailure(error))
    })
}
