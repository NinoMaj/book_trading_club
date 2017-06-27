// @flow

import {
  BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  GET_BOOKS_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS,
  BOOK_FAILURE,
} from '../action/books'

const initialState = {
  loading: false,
  titles: [],
  error: {},
}

const booksReducer = (
  state: { loading: Boolean, titles: mix[], error: Object } = initialState,
  action: { type: String, payload: any },
) => {
  switch (action.type) {
    case BOOK_REQUEST:
      return Object.assign({}, state, { loading: true })
    case ADD_BOOK_SUCCESS:
      return Object.assign({}, state, { titles: [...state.titles, action.payload], loading: false })
    case GET_BOOKS_SUCCESS:
      return Object.assign({}, state, { titles: action.payload, loading: false })
    case UPDATE_BOOK_SUCCESS:
      return Object.assign({}, state, {
        // eslint-disable-next-line
        titles: state.titles.map(book => (book._id === action.payload._id) ? action.payload : book),
        loading: false,
      })
    case DELETE_BOOK_SUCCESS:
      return Object.assign({}, state, {
        titles: state.titles.filter(book => book._id !== action.payload),
        loading: false,
      })
    case BOOK_FAILURE:
      return Object.assign({}, state, { error: action.payload, loading: false })
    default:
      return state
  }
}

export default booksReducer
