import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
const MongoStore = require('connect-mongo')(session)
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import multer from 'multer'
import helmet from 'helmet'
import csurf from 'csurf'
import apiRouter from './routes'
import tool from './utils/tools'

// 原生的promise替代mongoose的promise
mongoose.Promise = Promise

// 设置时区(貌似不生效)
process.env.TZ = 'Asia/Shanghai'

// 导入数据连接
import './db'

// 实例化
const app = express()

// for raw data
app.use((req, res, next) => {
  if (req.is('text/*')) {
    req.text = ''
    req.setEncoding('utf8')
    req.on('data', chunk => {
      req.text += chunk
    })
    req.on('end', next)
  } else {
    next()
  }
})

// 支持跨域
app.use(require('cors')())

// console.log('mongoose.connection')
// console.log(mongoose.connection)

app.use(cookieParser())
// 设置session,session的认证机制必须依赖cookie, 所以还应该同时装上 `cookie-parser`
const half_hour = 3600000 / 2 * 100000
/**
 * @param {type} secret 对session数据进行加密
 * @param {type} name 表示cookie的name, 默认的name是: connect.sid
 * @param {type} maxAge cookie过期时间, 单位毫秒
 * @param {type} resave 指每次请求都重新设置session,cookie,假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒
 * @param {type} saveUninitialized 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
 */
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'ly',
  resave: false,
  saveUninitialized: true,
  cookie: {
    // path: '/',
    domain: 'localhost',
    // secure: false,
    // maxAge: half_hour
    secure: false,
    // expires: false,
    maxAge: null
  }
}))

app.use(logger('dev'))
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))

app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard())

// app.use(csurf()) // 防止跨站请求伪造

const debug = require('debug')('ly-express-mongo')

app.use((req, res, next) => {

  next()
})

app.use(apiRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers development error handler will print stacktrace
if (app.get('env') === 'development') {
  app
    .use((err, req, res, next) => {
      res.status(err.status || 500)
      res.send({message: err.message, error: err})
    })
}

// production error handler no stacktraces leaked to user
app
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({message: err.message, error: err})
  })


app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${server.address().port}`)
  debug(`Express server listening on port ${server.address().port}`)
})

export default app