// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import {
  ADD_BOOK_ROUTE,
  GET_BOOKS_ROUTE,
  REQUEST_BOOK_ROUTE,
  ACCEPT_REQUEST_ROUTE,
  REJECT_REQUEST_ROUTE,
  DELETE_BOOK_ROUTE,
} from '../../shared/routes'
import { BOOK_API_URL, BOOK_API_KEY } from '../config'

export const BOOK_REQUEST = 'BOOK_REQUEST'
export const ADD_BOOK_SUCCESS = 'ADD_BOOK_SUCCESS'
export const GET_BOOKS_SUCCESS = 'GET_BOOKS_SUCCESS'
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS'
export const UPDATE_BOOK_SUCCESS = 'UPDATE_BOOK_SUCCESS'
export const BOOK_FAILURE = 'BOOK_FAILURE'

export const bookRequest = createAction(BOOK_REQUEST)
export const addBookSuccess = createAction(ADD_BOOK_SUCCESS)
export const getBooksSuccess = createAction(GET_BOOKS_SUCCESS)
export const updateBookSuccess = createAction(UPDATE_BOOK_SUCCESS)
export const deleteBookSuccess = createAction(DELETE_BOOK_SUCCESS)
export const bookFailure = createAction(BOOK_FAILURE)

export const addBook = (searchTerm: string, owner: string) => (dispatch: Function) => {
  dispatch(bookRequest())
  return fetch(`${BOOK_API_URL}${searchTerm}${BOOK_API_KEY}`, { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((googleResponse) => {
      const title = googleResponse.items[0].volumeInfo.title
      const imageUrl = googleResponse.items[0].volumeInfo.imageLinks.thumbnail

      fetch(ADD_BOOK_ROUTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          owner,
        }),
      })
        .then((res) => {
          if (!res.ok) throw Error(res.statusText)
          return res.json()
        })
        .then((bookSaved) => {
          if (!bookSaved) throw Error('Book not saved.')
          dispatch(addBookSuccess(bookSaved))
        })
        .catch((err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log('add book error', JSON.stringify(err))
            dispatch(bookFailure(err))
          }
          return true
        })
    })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('add book error', JSON.stringify(err))
        dispatch(bookFailure(err))
      }
      return true
    })
}

export const getBooks = () => (dispatch: Function) => {
  dispatch(bookRequest())
  return fetch(GET_BOOKS_ROUTE, { method: 'GET' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((books) => {
      if (!books) throw Error('No books received.')
      dispatch(getBooksSuccess(books))
    })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        dispatch(bookFailure(err))
      }
      return true
    })
}

export const requestBook = (requestedBook: string, userEmail: string, userName: string) =>
  (dispatch: Function) => {
    dispatch(bookRequest())
    return fetch(REQUEST_BOOK_ROUTE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestedBook,
        userEmail,
        userName,
      }),
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then((bookRequested) => {
        if (!bookRequested) throw Error('No book requested.')
        dispatch(updateBookSuccess(bookRequested))
      })
      .catch((err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          dispatch(bookFailure(err))
        }
        return true
      })
  }

export const acceptRequest = (bookId: string, requestId: ?string, requestorEmail: ?string) =>
  (dispatch: Function) => {
    dispatch(bookRequest())
    return fetch(ACCEPT_REQUEST_ROUTE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        requestId,
        requestorEmail,
      }),
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then((bookUpdated) => {
        if (!bookUpdated) throw Error('No book was updated.')
        dispatch(updateBookSuccess(bookUpdated))
      })
      .catch((err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          dispatch(bookFailure(err))
        }
        return true
      })
  }

export const rejectRequest = (bookId: string, requestId: string) =>
  (dispatch: Function) => {
    dispatch(bookRequest())
    return fetch(REJECT_REQUEST_ROUTE, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bookId,
        requestId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw Error(res.statusText)
        return res.json()
      })
      .then((bookUpdated) => {
        if (!bookUpdated) throw Error('No book was updated.')
        dispatch(updateBookSuccess(bookUpdated))
      })
      .catch((err) => {
        if (err) {
          // eslint-disable-next-line no-console
          console.error(err)
          dispatch(bookFailure(err))
        }
        return true
      })
  }

export const deleteBook = (bookToDelete: string) => (dispatch: Function) => {
  dispatch(bookRequest())
  return fetch(`${DELETE_BOOK_ROUTE}/${bookToDelete}`, { method: 'DELETE' })
    .then((res) => {
      if (!res.ok) throw Error(res.statusText)
      return res.json()
    })
    .then((bookDeleted) => {
      if (!bookDeleted) throw Error('No book deleted.')
      // eslint-disable-next-line
      dispatch(deleteBookSuccess(bookDeleted._id))
    })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        dispatch(bookFailure(err))
      }
      return true
    })
}

