/*
import jwt from 'jsonwebtoken'
import cookie from 'react-cookie'

import User from '../../server/models/users'
import { JWT_SECRET } from '../config'

function login(req) {
  var userAuth = {
    email: req.body.email,
    password: req.body.password,
  }

  if (userAuth.email && userAuth.password) {
    if (User.comparePassword(userAuth.email, userAuth.password)) {
      var token = jwt.sign(user, JWT_SECRET, {
        expiresIn: 864000
      })
      cookie.save('token', token, { path: '/' })
      userAuth.token = token
      req.session.user = user.email
    }
    else {
      console.log('not logged in!')
    }
  }
return Promise.resolve(userAuth);
}

export default login
*/
