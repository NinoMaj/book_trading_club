// @flow

import passport from 'passport'

import {
  homePage,
  validateSignupForm,
  validateLoginForm,
} from './controller'

import {
  HOME_PAGE_ROUTE,
  LIBRARY_PAGE_ROUTE,
  MY_BOOKS_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  LOGOUT_PAGE_ROUTE,
  AUTH_SIGN_UP_ROUTE,
  AUTH_LOGIN_ROUTE,
} from '../shared/routes'

import renderApp from './render-app'
import books from './api/books'
import user from './api/user'

export default (app: Object) => {
  app.get(HOME_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, homePage()))
  })

  app.get(LIBRARY_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  app.get(MY_BOOKS_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  app.get(SIGN_UP_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  app.get(LOGIN_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  app.get(SETTINGS_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  app.get(LOGOUT_PAGE_ROUTE, (req, res) => {
    res.send(renderApp(req.url, req, null))
  })

  // initialize books routes middleware
  app.use('/', books)

  // initialize users routes middleware
  app.use('/user', user)

  app.post(AUTH_SIGN_UP_ROUTE, (req, res, next) => {
    const validationResult = validateSignupForm(req.body)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      })
    }

    return passport.authenticate('local-signup', (err) => {
      if (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
          // the 11000 Mongo code is for a duplication email error
          // the 409 HTTP status code is for conflict error
          return res.status(409).json({
            success: false,
            message: 'Check the form for errors.',
            errors: {
              email: 'This email is already taken.',
            },
          })
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.',
        })
      }

      return res.status(200).json({
        success: true,
        message: 'You have successfully signed up! Now you should be able to log in.',
      })
    })(req, res, next)
  })

  app.post(AUTH_LOGIN_ROUTE, (req, res, next) => {
    const validationResult = validateLoginForm(req.body)
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors,
      })
    }

    return passport.authenticate('local-login', (err, token, userData) => {
      if (err) {
        if (err.name === 'IncorrectCredentialsError') {
          return res.status(400).json({
            success: false,
            message: err.message,
          })
        }

        return res.status(400).json({
          success: false,
          message: 'Could not process the form.',
        })
      }


      return res.json({
        success: true,
        message: 'You have successfully logged in!',
        token,
        user: userData,
      })
    })(req, res, next)
  })

  app.get('/500', () => {
    throw Error('Fake Internal Server Error')
  })

  app.get('*', (req, res) => {
    res.status(404).send(renderApp(req.url, req, null))
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.error(err.stack)
    res.status(500).send('Something went wrong!')
  })
}
