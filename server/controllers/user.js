import {userDao} from '../dao'

const add = (req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {
    // data = JSON.parse(data)
    console.log(`/user/add: `, data)
    userDao.add(data, err => {
      if (err) {
         req.session.current_user = void 0
        return res.json({success: false, message: '添加用户失败'})
      }
      // 为了简单操作, 在这里添加用户的时候, 直接设置新添加的用户为当前用户了
      req.session.current_user = data.nick_name
      const half_hour = 3600000 / 2
      req.session.cookie.expires = new Date(Date.now() + half_hour)
      req.session.cookie.maxAge = half_hour
      console.dir(req.session)

      return res.json({success: true, message: '添加用户成功'})
    })
  } else {
    return res.json({success: false, message: '您还没填写任何用户信息'})
  }
}

const lists = (req, res, next) => {
  console.log(`/user/lists`)
  console.log(`/current_user: ${req.session.current_user}`)
  console.dir(req.session)
  userDao.getAll((err, data) => {
    if (err) return res.json({success: false, message: '查询所有用户失败'})
    return res.json({success: true, message: '获取所有用户成功', data: data})
  })
}

const remove = (req, res, next) => {
  console.log(`user delete`)
  let id = 0
  if (!!req.query) {
    id = req.query.id
  } else {
    return res.json({success: false, message: '该用户id缺失'})
  }
  console.log(`id: ${id}`)
  if (!id) {
    return res.json({success: false, message: '该用户id缺失'})
  }
  userDao.deleteById(id, err => {
    if (err) return res.json({success: false, message: '删除该用户失败'})
    return res.json({success: true, message: '删除该用户成功'})
  })
}

module.exports = {
  add,
  lists,
  remove
}