import express from 'express'
import logger from '../utils/logger'
import {userController} from '../controllers'

// const router = express.Router()

const add = (req, res, next) => {
  res.send('Welcome to User Index Page')
  next()
}

const lists = (req, res, next) => {
    res.send('Welcome to User Lists Page')
  next()
}

export default {
  add,
  lists
}

// router.all('/', (req, res, next) => {
//   res.send('Welcome to User Index Page')
//   next()
// })

// router.all('/lists', (req, res, next) => {
//     res.send('Welcome to User Lists Page')
//   next()
// })

// export default router