import jwt from 'jsonwebtoken'
import PassportLocalStrategy from 'passport-local'

import User from '../models/users'

/**
 * Return the Passport Local Strategy object.
 */
const localLoginStrategy = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
  }

  // find a user by email address
  return User.findOne({ email: userData.email }, (err, user) => {
    if (err) { return done(err) }

    if (!user) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    // check if a hashed user's password is equal to a value saved in the database
    return user.comparePassword(userData.password, (passwordErr, isMatch) => {
      if (err) { return done(err) }

      if (!isMatch) {
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }

      const payload = {
        // eslint-disable-next-line
        sub: user._id,
        name: user.name,
        email: user.email,
      }

      // create a token string
      const token = jwt.sign(payload, process.env.JWT_SECRET)
      const data = {
        name: user.name,
        email: user.email,
      }

      return done(null, token, data)
    })
  })
})

export default localLoginStrategy

/*
   The basic logic here is to check if a user with a given email exists.
   If so, we will compare the given password’s hash value with a value saved in the database.
   If the user exists and the password is correct, we will create a JSON Web Token (JWT).
   The token looks similar to this:

   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiY
   WRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
   And consists of three encoded parts divided by dots:
     header (algorithm and token type)
     payload (data)
     signature
   The signature part contains an encoded header, a payload, and a secret key phrase.

   In the example above we haven’t specified an algorithm and only have provided a payload part.
   If the algorithm option is omitted, the default algorithm will be HS256.

   Notice the sub key in the payload part. It’s a reserved key for a subject item,
   which in our example will be a user’s id.
 */
