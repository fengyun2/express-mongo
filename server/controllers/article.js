import { articleDao } from '../dao'

const add = (req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {
    console.log(`/article/add: `, data)
    articleDao.add(data, err => {
      if (err) {
        let message = '添加文章失败'
        req.session.current_article = void 0
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

      return res.json({ success: true, message: '添加文章成功', err })
    })
  } else {
    return res.json({ success: false, message: '您还没填写任何文章信息', err: null })
  }
}

const lists = (req, res, next) => {
  console.log(`/article/lists`)
  console.dir(req.session)
  articleDao.getAll((err, data) => {
    if (err) return res.json({ success: false, message: '查询所有文章失败' })
    return res.json({ success: true, message: '获取所有文章成功', data: data })
  })
}

const remove = (req, res, next) => {
  console.log(`article delete`)
  let id = 0
  if (!!req.query) {
    id = req.query.id
  } else {
    return res.json({ success: false, message: '该文章id缺失' })
  }
  console.log(`id: ${id}`)
  if (!id) {
    return res.json({ success: false, message: '该文章id缺失' })
  }
  articleDao.deleteById(id, err => {
    if (err) return res.json({ success: false, message: '删除该文章失败' })
    return res.json({ success: true, message: '删除该文章成功' })
  })
}

module.exports = {
  add,
  lists,
  remove
}