import express from 'express'
import logger from '../utils/logger'
import {userController} from '../controllers'

const router = express.Router()

router.get('/', (req, res, next) => {
  logger.log(`method: ${req.method}`)
  res.send('Hello Index Page')
})

router.get('/user', (req, res, next) => {
  logger.log(`user page`)
  res.send('Hello User Page')
})

router.all('/user/add', userController.add)
router.all('/user/lists', userController.lists)

export default router