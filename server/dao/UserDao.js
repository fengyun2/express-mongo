/**
 * 数据库操作类UserDao 继承于 BaseDao
 */

// 导入基础类
import BaseDao from './BaseDao'

class UserDao extends BaseDao {
  constructor(model) {
    super(model)
    this.model = model
  }
}

export default UserDao
