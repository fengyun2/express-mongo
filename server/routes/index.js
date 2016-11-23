import express from 'express'
import logger from '../utils/logger'
import { userController, articleController, commentController } from '../controllers'

const router = express.Router()

router.get('/', (req, res, next) => {
  res.send('Hello Index Page')
})

/**
 * 用户操作
 */
router.get('/user', (req, res, next) => {
  res.send('Hello User Page')
})

router.post('/user/add', userController.add)
router.all('/user/lists', userController.lists)
router.all('/user/delete', userController.remove)

/**
 * 文章操作
 */
router.get('/article', (req, res, next) => {
  res.send('Hello Article Page')
})

router.post('/article/add', articleController.add)
router.all('/article/lists', articleController.lists)
router.all('/article/delete', articleController.remove)

/**
 * 评论操作
 */
router.get('/comment', (req, res, next) => {
  res.send('Hello Comment Page')
})

router.post('/comment/add', commentController.add)
router.all('/comment/lists', commentController.lists)
router.all('/comment/delete', commentController.remove)

export default router
