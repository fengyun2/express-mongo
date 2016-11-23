/**
 * user模型(schema)
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserSchema = new Schema({
  nick_name: { type: String },
  account: { type: String },
  password: { type: String },
  email: { type: String },
  location: { type: String },
  qq: { type: String },
  img_url: { type: String },
  motto: { type: String },
  github: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

// 创建索引
UserSchema.index({ created_at: -1 })
UserSchema.index({ updated_at: -1 })
UserSchema.index({ email: -1 })

// 2016/11/22 添加(含有this的都需要废弃)
/**
 * 虚拟属性(此时的this既不是 model, 也不是是 entity, 而是dao, 所以获取的this没有任何模型的方法, 也用不了虚拟属性了)
 */

/**
 * 1.获取虚拟属性
 * Usage:
 * userDao.name.full
 */
// UserSchema.virtual('name.full').get(() => {
//   return `${this.nick_name} ${this.email}`
// })
// /**
//  * 2.设置虚拟属性(属性会被自动分解)
//  * Usage:
//  * userDao.name.full = 'ly 1518550424@qq.com'
//  */
// UserSchema.virtual('name.full').set(name => {
//   const split = name.split(' ')
//   this.nick_name = split[0]
//   this.email = split[1]
// })

// /**
//  * 验证器
//  */
UserSchema.path('nick_name').validate(name => name.length, '昵称不能为空')
UserSchema.path('email').validate(email => email.length, '邮箱不能为空')

// UserSchema.path('email').validate((email, fn) => {

//   // 检查邮箱是否为新或者正在修改邮箱
//   if (this.isNew || this.isModified('email')) {
//     fn(true)
//   } else {
//     fn(true)
//   }
// }, '邮箱已经存在')

// /**
//  * 中间件(其实, validate也算是一种中间件)
//  */
UserSchema.pre('save', next => {
  next()
})

UserSchema.pre('remove', next => {
  next()
})


// 第三个参数决定集合是否以复数的形式
const userModel = mongoose.model('user', UserSchema, 'user')

export default userModel