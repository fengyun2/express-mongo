/**
 * 数据库操作基础类BaseDao
 */

class BaseDao {
  constructor(model) {
    this.model = model
  }

  add(data, callback) {

    console.log('create data: ', data)

    this
      .model
      .create(data, err => {

        console.log('create err ===> ', err)

        if (err) {
          return callback(err)
        }

        return callback(null)
      })
  }

  getById(id, callback) {
    this
      .model
      .findById(id, (err, data) => {
        if (err) {
          return callback(err, null)
        }
        return callback(null, data)
      })
  }

  getByIdAndUpdate(id, update, callback) {
    this
      .model
      .findByIdAndUpdate(id, update, (err, data) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, data)
      })
  }

  getAll(callback) {

    console.log('Dao getAll')

    this
      .model
      .find({}, (err, model) => {
        if (err)
          return callback(err, null)

        return callback(null, model)
      })
  }

  getByQuery(query, fields, opt, callback) {
    this
      .model
      .find(query, fields, opt, (err, model) => {
        if (err)
          return callback(err, null)

        return callback(null, model)
      })
  }

  getOneByQuery(query, fields, opt, callback) {
    this
      .model
      .findOne(query, fields, opt, (err, model) => {
        if (err)
          return callback(err, null)

        return callback(null, model)
      })
  }

  deleteById(id, callback) {
    this
      .model
      .remove({
        _id: id
      }, (err, raw) => {
        if (err)
          return callback(err, null)

        return callback(null, raw)
      })
  }

  getSumCount(callback) {
    this
      .model
      .count({}, (err, sumCount) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, sumCount)
      })
  }

  getSumCountByQuery(query, callback) {
    this
      .model
      .count(query, (err, sumCount) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, sumCount)
      })
  }

  updateById(id, doc, callback) {
    this
      .model
      .update({
        _id: id
      }, doc, (err, raw) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, raw)
      })
  }

  findByIdAndUpdate(id, fields, callback) {
    this
      .model
      .findByIdAndUpdate({
        _id: id
      }, fields, (err, doc) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, doc)
      })
  }

  getListByPage(obj, callback) {
    const page = obj.page || 1
    const page_size = obj.page_size || 10
    const query = obj.query || {}
    const sort = obj.sort || {
      created_at: -1
    }
    const fields = obj.fields || null

    this
      .model
      .find(query)
      .select(fields)
      .sort(sort)
      .skip((page - 1) * page_size)
      .limit(page_size)
      .exec((err, docs) => {
        if (err) {
          return callback(err, null)
        }

        return callback(null, docs)
      })
  }
}

export default BaseDao