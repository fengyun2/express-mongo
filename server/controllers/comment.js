import {articleDao} from '../dao'

const add = async (req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {
    if (!(!!data.article_id || !!data.content)) {
      return res.json({success: false, message: '缺少必要参数', err: null})
    }
    console.log(`/comment/add: `, data)

    let message = '添加评论'
    try {
      message += '成功'
      let result = await articleDao.addComment(data)
      return res.json({success: true, message: '添加评论成功', err: null})
    } catch (err) {
      message += '失败'
      return res.json({success: false, message, err})
    }
  } else {
    return res.json({success: false, message: '您还没填写任何评论信息', err: null})
  }
}

const lists = async(req, res, next) => {
  console.log(`/comment/lists`)

  let message = '查询所有评论'
  try {
    message += '成功'
    let articles  = await articleDao.getAllComments()
    return res.json({success: true, message, data: articles})
  } catch (err) {
    message += '失败'
    return res.json({success: false, message})
  }
}

/**
 * todos
 * 还没完成评论
 */
const remove = async(req, res, next) => {
  console.log(`article delete`)
  let id = 0
  if (!!req.query) {
    id = req.query.id
  } else {
    return res.json({success: false, message: '该评论id缺失'})
  }
  console.log(`id: ${id}`)
  if (!id) {
    return res.json({success: false, message: '该评论id缺失'})
  }
  let message = '删除该评论'

  try {
    message += '成功'
    let article = await articleDao.deleteCommentById(id)

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