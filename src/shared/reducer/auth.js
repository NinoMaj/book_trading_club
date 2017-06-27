// @flow

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_CHECK,
  LOGOUT,
} from '../action/auth'

const initialState = {
  loading: false,
  logged: false,
  email: '',
  name: '',
  error: {},
}

const authReducer = (
  state: {loading: Boolean, logged: Boolean, email: String, error: Object } = initialState,
  action: { type: string, payload: any },
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, { loading: true })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        logged: action.payload.logged,
        email: action.payload.email,
        name: action.payload.name,
        loading: false,
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, { error: action.payload, loading: false })
    case LOGIN_CHECK:
      return Object.assign({}, state, {
        logged: true,
        email: action.payload.email,
        name: action.payload.name,
      })
    case LOGOUT:
      return Object.assign({}, state, { logged: false, email: '' })
    default:
      return state
  }
}

export default authReducer
