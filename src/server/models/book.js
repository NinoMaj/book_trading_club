// @flow

import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  owner: String,
  requestedBy: [{
    userEmail: String,
    userName: String,
  }],
})

const Book = mongoose.model('Book', BookSchema)

export default Book
