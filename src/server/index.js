// @flow

import compression from 'compression'
import express from 'express'
import bodyParser from 'body-parser'
import passport from 'passport'

import routing from './routing'
import { WEB_PORT, STATIC_PATH, DB_URI } from '../shared/config'
import { isProd } from '../shared/util'
import db from './models'
import localSignupStrategy from './passport/local-signup'
import localLoginStrategy from './passport/local-login'
import authCheckMiddleware from './middleware/auth-check'

// global.navigator = global.navigator || {}
// global.navigator.userAgent = global.navigator.userAgent || 'all'

const app = express()

// connect to the database and load models
// require('./server/models').connect(DB_URI)
db(DB_URI)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// pass the passport middleware
app.use(passport.initialize())

// load passport strategies
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// pass the authenticaion checker middleware
app.use('/api', authCheckMiddleware)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

routing(app)

app.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "npm run dev:wds" running in an other terminal'}.`)
})
