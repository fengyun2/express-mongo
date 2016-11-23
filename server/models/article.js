/**
 * artilce模型(schema)
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ArticleSchema = new Schema({
  title: { type: String, default: '', trim: true },
  sub_title: { type: String, default: '', trim: true },
  content: { type: String, default: '', trim: true },
  top: {type: Number, default: 0},
  user: { type: ObjectId, ref: 'User' }, // 外联
  comments: [{
    content: { type: String, default: '', trim: true },
    user: { type: ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  }],
  image: {
    cdnUri: { type: String, default: '' },
    files: [String]
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

// 创建索引
ArticleSchema.index({ created_at: -1 })
ArticleSchema.index({ updated_at: -1 })

// 2016/11/22 添加(含有this的都需要废弃)
/**
 * 虚拟属性(此时的this既不是 model, 也不是是 entity, 而是dao, 所以获取的this没有任何模型的方法, 也用不了虚拟属性了)
 */

/**
 * 验证器
 */
ArticleSchema.path('title').validate(name => name.length, '标题不能为空')
ArticleSchema.path('content').validate(email => email.length, '文章内容不能为空')


/**
 * 中间件(其实, validate也算是一种中间件)
 */
ArticleSchema.pre('save', next => {
  next()
})

ArticleSchema.pre('remove', next => {
  next()
})


// 第三个参数决定集合是否以复数的形式
const articleModel = mongoose.model('article', ArticleSchema, 'article')

export default articleModel