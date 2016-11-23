/**
 * 文章操作类ArticleDao 继承于 BaseDao
 */

// 导入基础类
import BaseDao from './BaseDao'

class ArticleDao extends BaseDao {
  constructor (model) {
    super(model)
  }
}

export default ArticleDao