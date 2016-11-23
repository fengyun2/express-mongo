/**
 * 文章操作类ArticleDao 继承于 BaseDao
 */

// 导入基础类
import BaseDao from './BaseDao'

class ArticleDao extends BaseDao {
  constructor(model) {
    super(model)
  }
  async addComment(comment) {
    const { article_id } = comment
    try {
      let { comments } = await this.getById(article_id)
      comments.push(comment)

      let result = await this.updateById(article_id, {comments})

      return result

    } catch (err) {
      return new Error(err)
    }

    /**
     * callback方式实现的
     */

    // this.getById(comment.article_id, (err, res) => {
    //   if (err) {
    //     return callback(err, null)
    //   }

    //   let comments = res.comments
    //   comments.push(comment)

    //   this.updateById(comment.article_id, {
    //     comments: comments
    //   }, (err, data) => {
    //     if (err) {
    //       return callback(err, null)
    //     }
    //     return callback(null, data)
    //   })
    // })
  }

  async getAllComments () {
    return await this.model.find({}).select('comments').sort({created_at: -1}).exec()
  }
  getArticleAndUser() {
    return this
      .model
      .find({})
      .populate('user', 'nick_name email')
      .sort({created_at: -1})
      // .limit(limit)
      // .skip(limit * page)
      .exec()
  }
  getOneArticleAndComment(id, callback) {
    this
      .model
      .findById(id, (err, data) => {
        if (err) {
          return callback(err, null)
        }
        return callback(null, data)
      })
  }
}

export default ArticleDao