import PassportLocalStrategy from 'passport-local'

import User from '../models/users'

/**
 * Return the Passport Local Strategy object.
 */
const localSignupStrategy = new PassportLocalStrategy({
  // By default, LocalStrategy attempts to find data in username and password POST body properties.
  // Instead of a username I want to my users use an email address to authenticate themselves.
  // To change default settings we need to pass an object
  usernameField: 'email',
  passwordField: 'password',
  // to false due to we will use the token approach to authentication
  session: false,
  // required to be able to read other parameters in the POST body messag
  passReqToCallback: true,
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    name: req.body.name.trim(),
    city: '',
    state: '',
    dateCreated: Date.now(),
  }

  const newUser = new User(userData)
  newUser.save((err) => {
    if (err) { return done(err) }

    return done(null)
  })
})

export default localSignupStrategy
