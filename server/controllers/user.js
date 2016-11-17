import {userDao} from '../dao'
import logger from '../utils/logger'

const add = (req, res, next) => {
  let {data} = req.body
  if (!!data) {
    data = JSON.parse(data)
    logger.log(`/user/add: `, data)
    userDao.add(data, err => {
      if (err) return res.json({success: false, message: '添加用户失败'})
      return res.json({success: true, message: '添加用户成功'})
    })
  }
  return res.json({success: false, message: '您还没填写任何用户信息'})
}

const lists = (req, res, next) => {
  logger.log(`/user/lists`)

  userDao.getAll((err, data) => {
    logger.log('getAll: ', data)
    if (err) return res.json({success: false, message: '查询所有用户失败'})
    return res.json({success: true, message: '获取所有用户成功', data: data})
  })
}

module.exports = {
  add,
  lists
}