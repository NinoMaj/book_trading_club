// @flow

import { createAction } from 'redux-actions'

import {
  GET_USER_ROUTE,
  UPDATE_USER_ROUTE,
} from '../../shared/routes'

export const USER_REQUEST = 'USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'

export const userRequest = createAction(USER_REQUEST)
export const getUserSuccess = createAction(GET_USER_SUCCESS)
export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS)
export const userFailure = createAction(USER_FAILURE)

export const SHOW_ALERT = 'SHOW_ALERT'
export const showAlert = createAction('SHOW_ALERT')
export const HIDE_ALERT = 'HIDE_ALERT'
export const hideAlert = createAction('HIDE_ALERT')

export const getUser = (email: string) => (dispatch: Function) => {
  dispatch(userRequest())
  return fetch(`/user${GET_USER_ROUTE}/${email}`, { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((user) => {
      if (!user) throw Error('No user received.')
      dispatch(getUserSuccess(user))
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err)
      dispatch(userFailure(err))
    })
}

export const updateUser = (
  userEmail: string,
  fullName: string,
  city: string,
  state: string,
  ) => (dispatch: Function) => {
    dispatch(userRequest())
    return fetch(`/user${UPDATE_USER_ROUTE}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          fullName,
          city,
          state,
        }),
      })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then((updatedUser) => {
        if (!updatedUser) throw Error('No user received.')
        dispatch(updateUserSuccess(updatedUser))
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
        dispatch(userFailure(err))
      })
  }
