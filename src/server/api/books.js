import express from 'express'

import Book from '../models/book'

import {
  ADD_BOOK_ROUTE,
  GET_BOOKS_ROUTE,
  REQUEST_BOOK_ROUTE,
  ACCEPT_REQUEST_ROUTE,
  REJECT_REQUEST_ROUTE,
  DELETE_BOOK_ROUTE,
} from '../../shared/routes'

const router = express.Router()

router.post(ADD_BOOK_ROUTE, (req, res) => {
  const { title, imageUrl, owner } = req.body
  const newBook = {
    title,
    imageUrl,
    owner,
    requestedBy: [],
  }
  const book = new Book(newBook)
  book.isNew = true
  book.save((err, bookSaved) => {
    if (err) return res.status(500).send('Error while saving:', err)
    return res.status(200).send(bookSaved)
  })
  // ALTERNATIVE
  // Book.create(newBook).then((bookSaved) => {
  //   console.log(bookSaved)
  //   res.send(bookSaved)
  // }).catch((err) => {
  //   console.error(err)
  //   res.status(500).send('Error while saving:', err)
  // })
})


router.get(GET_BOOKS_ROUTE, (req, res) => {
  const promise = Book.find({}).exec()

  promise.then(books => (
    res.status(200).send(books)
  ))
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('error in get books API:', err)
        return res.status(500).send('Error while getting books:', err)
      }
      return res.json()
    })
  // ALTERNATIVE
  // Book.find({}, (err, books) => {
  //   if (err) return res.status(500).send('Error while getting books:', err)
  //   return res.status(200).send(books)
  // })
})

router.put(REQUEST_BOOK_ROUTE, (req, res) => {
  const { requestedBook, userEmail, userName } = req.body
  const promise = Book.findById({ _id: requestedBook }).exec()
  // ALTERNATIVE (not tested)
  // const promise = Book.findByIdAndUpdate(
  // { _id: requestedBook },
  // { $addToSet: requestedBy: { userEmail, userName } })
  // .exec()

  promise.then((book) => {
    book.requestedBy.addToSet({ userEmail, userName })
    book.save()
    res.status(200).send(book)
  })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log('error in request book API:', err)
      return res.status(500).send('Error while requesting book:', err)
    })
  // ALTERNATIVE
  // Book.find({}, (err, books) => {
  //   if (err) return res.status(500).send('Error while getting books:', err)
  //   return res.status(200).send(books)
  // })
})

router.put(ACCEPT_REQUEST_ROUTE, (req, res) => {
  const { bookId } = req.body
  let { requestorEmail = '' } = req.body
  const promise = Book.findById({ _id: bookId }).exec()

  promise.then((book) => {
    if (requestorEmail === '') {
      requestorEmail = book.requestedBy[0].userEmail
    }
    book.set({ owner: requestorEmail })
    book.set({ requestedBy: [] })
    book.save()
    res.status(200).send(book)
  })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('error in accepting request, book API:', err)
        return res.status(500).send('Error while accepting requests:', err)
      }
      return res.json()
    })
})

router.put(REJECT_REQUEST_ROUTE, (req, res) => {
  const { bookId, requestId } = req.body
  const promise = Book.findById({ _id: bookId }).exec()

  promise.then((book) => {
    book.requestedBy.pull(requestId)
    book.save()
    res.status(200).send(book)
  })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('error in rejecting request, book API:', err)
        return res.status(500).send('Error while rejecting requests:', err)
      }
      return res.json()
    })
})

router.delete(`${DELETE_BOOK_ROUTE}/:bookToDelete`, (req, res) => {
  const promise = Book.findOne({ _id: req.params.bookToDelete }).exec()

  promise.then((book) => {
    book.remove()
    res.status(200).send(book)
  })
    .catch((err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('error in delete book API:', err)
        return res.status(500).send('Error while deleting book:', err)
      }
      return res.json()
    })
  // ALTERNATIVE
  // Book.find({}, (err, books) => {
  //   if (err) return res.status(500).send('Error while getting books:', err)
  //   return res.status(200).send(books)
  // })
})

export default router
