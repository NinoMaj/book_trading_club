// @flow

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  name: String,
  fullName: String,
  city: String,
  state: String,
  dateCreated: Date,
})

/**
 * Compare the passed password with the value in the database. A model method.
 *
 * @param {string} password
 * @returns {object} callback
 */
UserSchema.methods.comparePassword = function comparePassword(password: string, callback: Object) {
  bcrypt.compare(password, this.password, callback)
}

/**
 * The pre-save hook method.
 */
UserSchema.pre('save', function saveHook(next) {
  const user = this

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next()

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError) }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) { return next(hashError) }

      // replace a password string with hash value
      user.password = hash

      return next()
    })
  })
})

const User = mongoose.model('User', UserSchema)

export default User
