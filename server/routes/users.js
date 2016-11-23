/**
 * 已废弃[2016/11/23]
 *
 */
import express from 'express'
import logger from '../utils/logger'
import {userController} from '../controllers'

const add = (req, res, next) => {
  res.send('Welcome to User Index Page')
}

const lists = (req, res, next) => {
  res.send('Welcome to User Lists Page')
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