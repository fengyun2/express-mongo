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

// 第三个参数决定集合是否以复数的形式
const userModel = mongoose.model('user', UserSchema, 'user')

export default userModel