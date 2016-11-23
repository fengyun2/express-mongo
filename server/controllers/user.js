import { userDao } from '../dao'

const add = async(req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {

    if (!(!!data.nick_name)) {
      return res.json({success: false, message: '用户昵称不能为空'})
    }
    console.log(`/user/add: `, data)

    let message = '添加用户'
    try {
      message += '成功'
      let user = await userDao.add(data)

      // 为了简单操作, 在这里添加用户的时候, 直接设置新添加的用户为当前用户了
      req.session.current_user = data.nick_name
      const half_hour = 3600000 / 2
      req.session.cookie.expires = new Date(Date.now() + half_hour)
      req.session.cookie.maxAge = half_hour
      console.dir(req.session)

      return res.json({ success: true, message, err: null })
    } catch (err) {
      message += '失败'
      req.session.current_user = void 0
      if (!!err.errors) {
        message = ''
        for (let key in err.errors) {
          if (!!err.errors[key]) {
            message += `|${err.errors[key].message}`
          }
        }
      }
      return res.json({ success: false, message, err })
    }
  } else {
    return res.json({ success: false, message: '您还没填写任何用户信息', err: null })
  }
}

const lists = async(req, res, next) => {
  console.log(`/user/lists`)
  console.log(`/current_user: ${req.session.current_user}`)
  console.dir(req.session)

  let message = '查询所有成员'
  try {
    message += '成功'
    let users  = await userDao.getAll()
    return res.json({success: true, message, data: users})
  } catch (err) {
    message += '失败'
    return res.json({success: false, message})
  }
}

const remove = async(req, res, next) => {
  console.log(`user delete`)
  let id = 0
  if (!!req.query) {
    id = req.query.id
  } else {
    return res.json({ success: false, message: '该用户id缺失' })
  }
  console.log(`id: ${id}`)
  if (!id) {
    return res.json({ success: false, message: '该用户id缺失' })
  }

  let message = '删除该用户'

  try {
    message += '成功'
    let user = await userDao.deleteById(id)

    return res.json({success: true, message})
  } catch (err) {
    message += '失败'
    return res.json({success: false, message})
  }
}

module.exports = {
  add,
  lists,
  remove
}