import jwt from 'jsonwebtoken'

import User from '../models/users'
import JWT_SECRECT from '../../shared/config'

/**
 *  The Auth Checker middleware function.
 */

const authCheckMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end()
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1]

  // decode the token using a secret key-phrase
  return jwt.verify(token, JWT_SECRECT, (err, decoded) => {
    // the 401 code is for unauthorized status
    if (err) { return res.status(401).end() }

    const userId = decoded.sub

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end()
      }

      return next()
    })
  })
}

export default authCheckMiddleware

/**
 *  In the file, we’re checking if the authorization header exists in an HTTP request.
 *  Then we decode the token to get the user’s id. With this id, we’re trying to find
 *  out if the user really exists. If at any step something unacceptable happens we will
 *  send back a response with 401 status code (unauthorized).
 */
