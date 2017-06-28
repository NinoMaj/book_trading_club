// @flow

import { USER_REQUEST, GET_USER_SUCCESS, UPDATE_USER_SUCCESS, USER_FAILURE, SHOW_ALERT, HIDE_ALERT } from '../action/user-settings'

const initialState = {
  loading: false,
  fullName: '',
  city: '',
  state: '',
  alert: {
    show: false,
    message: '',
  },
  error: null,
}

const userSettingsReducer = (
  state: {
    loading: Boolean,
    fullName: String,
    city: String,
    alert: {
      show: Boolean,
      message: String
    },
    error: ?string } = initialState,
  action: { type: String, payload: any },
) => {
  switch (action.type) {
    case USER_REQUEST:
      return Object.assign({}, state, { loading: true })
    case GET_USER_SUCCESS:
      return Object.assign({}, state,
        {
          fullName: action.payload.fullName,
          city: action.payload.city,
          state: action.payload.state,
          loading: false,
        })
    case UPDATE_USER_SUCCESS:
      return Object.assign({}, state,
        {
          fullName: action.payload.fullName,
          city: action.payload.city,
          state: action.payload.state,
          loading: false,
        })
    case SHOW_ALERT:
      return Object.assign({}, state, { alert: { show: true, message: action.payload } })
    case HIDE_ALERT:
      return Object.assign({}, state, { alert: { show: false, message: '' } })
    case USER_FAILURE:
      return Object.assign({}, state, { error: action.payload })
    default:
      return state
  }
}

export default userSettingsReducer
