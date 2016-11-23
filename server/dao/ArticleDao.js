/**
 * 文章操作类ArticleDao 继承于 BaseDao
 */

// 导入基础类
import BaseDao from './BaseDao'

class ArticleDao extends BaseDao {
  constructor(model) {
    super(model)
  }
  addComment(comment, callback) {
    console.log(`comment: >>>`, comment)
    this
      .getById(comment.article_id, (err, res) => {
        if (err) {
          return callback(err, null)
        }

        let comments = res.comments
        comments.push(comment)

        this.updateById(comment.article_id, {comments: comments}, (err, data) => {
          if (err) {
            return callback(err, null)
          }
          return callback(null, data)
        })
      })

  }
}

export default ArticleDao