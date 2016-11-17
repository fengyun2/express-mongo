import express from 'express'
import logger from '../utils/logger'
import {userController} from '../controllers'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Hello Index Page')
})

router.get('/user', (req, res, next) => {
  res.send('Hello User Page')
})

router.post('/user/add', userController.add)
router.all('/user/lists', userController.lists)
router.all('/user/delete', userController.remove)

export default router
