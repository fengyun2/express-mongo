// 基础数据库配置

import mongoose from 'mongoose'
import config from 'config'
import logger from './utils/logger'

// if (config.has('mongodb')) {
const {host, port, dbName} = config.get('mongodb')

const connectionString = `mongodb://${host}:${port}/${dbName}`

const options = {
  db: {
    native_parser: true
  },
  server: {
    auto_reconnect: true,
    poolSize: 20
  }
}
// mongodb://127.0.0.1/blog

mongoose.connect(connectionString, options, (err, res) => {
  if (err) {
    logger.error(`[mongoose log] Error connecting to ${dbName} error: ${err.message}`)
    return process.exit(1)
  }
  return logger.log(`[mongoose log] Successfully connected to ${dbName}`)
})

const mongodb = mongoose.connection

mongodb.on('error', err => logger.error(`mongoose connection error: ${err.message}`))

mongodb.once('open', () => {
  return logger.info('mongoose open success')
})

mongodb.on('disconnected', () => {
  logger.error(`mongoose connection error: ${err.message}`)
})
// }
export default mongodb
