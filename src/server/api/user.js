import express from 'express'

import User from '../models/users'
import {
  GET_USER_ROUTE,
  UPDATE_USER_ROUTE,
} from '../../shared/routes'

const router = express.Router()

router.get(`${GET_USER_ROUTE}/:userEmail`, (req, res) => {
  const promise = User.findOne({ email: req.params.userEmail }).exec()

  promise.then((user) => {
    res.status(200).send(user)
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    res.status(500).send(err)
  })
})

router.put(UPDATE_USER_ROUTE, (req, res) => {
  const { userEmail, fullName, city, state } = req.body
  const promise = User.findOne({ email: userEmail }).exec()

  promise.then((user) => {
    user.set({ fullName })
    user.set({ city })
    user.set({ state })
    user.save()
    res.status(200).send(user)
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err)
    res.status(500).send(err)
  })
})

export default router
