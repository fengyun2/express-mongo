import {articleDao} from '../dao'

const add = async(req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {
    if (!(!!req.session && !!req.session.current_user)) {
      data.user = '582d5549a9f6132730539a16'
    }
    console.log(`/article/add: `, data)

    let message = '添加文章'
    try {
      message += '成功'
      let article = await articleDao.add(data)
      return res.json({success: true, message, err: null})
    } catch (err) {
        message += '失败'
        if (!!err.errors) {
          message = ''
          for (let key in err.errors) {
            if (!!err.errors[key]) {
              message += `|${err.errors[key].message}`
            }
          }
        }
        return res.json({success: false, message, err})
    }
  } else {
    return res.json({success: false, message: '您还没填写任何文章信息', err: null})
  }
}

const lists = async(req, res, next) => {
  console.log(`/article/lists`)

  let message = '查询所有文章'
  try {
    message += '成功'
    let articles  = await articleDao.getAll()
    return res.json({success: true, message, data: articles})
  } catch (err) {
    message += '失败'
    return res.json({success: false, message})
  }
}

const remove = async(req, res, next) => {
  console.log(`article delete`)
  let id = 0
  if (!!req.query) {
    id = req.query.id
  } else {
    return res.json({success: false, message: '该文章id缺失'})
  }
  console.log(`id: ${id}`)
  if (!id) {
    return res.json({success: false, message: '该文章id缺失'})
  }

  let message = '删除该文章'

  try {
    message += '成功'
    let article = await articleDao.deleteById(id)

    return res.json({success: true, message})
  } catch (err) {
    message += '失败'
    return res.json({success: false, message})
  }
}

const articleAndUser = async(req, res, next) => {
  try {
    let articles = await articleDao
    .getArticleAndUser()

    // console.log(`articles: `, articles)
    return res.json({success: true, message: '查询文章/评论和用户成功', data: articles})
  } catch (err) {
    return res.json({success: false, message: '查询文章/评论以及用户失败', err})
  }

}

module.exports = {
  add,
  lists,
  remove,
  articleAndUser
}