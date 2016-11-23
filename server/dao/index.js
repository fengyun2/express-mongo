/**
 * 数据库核心操作控制中心
 */

import config from 'config'

/**************************************
 *
 *  导入模型
 *
 *  ***********************************/

import {userModel} from '../models'
import {articleModel} from '../models'

/**************************************
 *
 *  导入操作类
 *
 *  ***********************************/
import UserDao from './UserDao'
import ArticleDao from './ArticleDao'
/**************************************
 *
 *  导出接口(导出包含model的操作)
 *
 *  ***********************************/
module.exports = {
  userDao: new UserDao(userModel),
  articleDao: new ArticleDao(articleModel)
}