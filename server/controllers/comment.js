import {articleDao} from '../dao'

const add = (req, res, next) => {
  let {data} = req.body
  if (!data) {
    data = req.body
  }
  if (!!data) {
    if (!!data.article_id || !!data.content) {
      return res.json({success: false, message: '缺少必要参数', err: null})
    }
    console.log(`/comment/add: `, data)
    articleDao.addComment(data, err => {
      if (err) {
        let message = '添加评论失败'
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

      return res.json({success: true, message: '添加评论成功', err})
    })
  } else {
    return res.json({success: false, message: '您还没填写任何评论信息', err: null})
  }
}

const lists = (req, res, next) => {
  console.log(`/comment/lists`)
  articleDao.getAll((err, data) => {
    if (err)
      return res.json({success: false, message: '查询所有评论失败'})
    return res.json({success: true, message: '获取所有评论成功', data: data})
  })
}

const remove = (req, res, next) => {
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
  articleDao.deleteById(id, err => {
    if (err)
      return res.json({success: false, message: '删除该评论失败'})
    return res.json({success: true, message: '删除该评论成功'})
  })
}

module.exports = {
  add,
  lists,
  remove
}