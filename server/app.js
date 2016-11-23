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

import './db'

// 实例化
const app = express()

// 设置时区(貌似不生效)
process.env.TZ = 'Asia/Shanghai'

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

// 设置session
const half_hour = 3600000 / 2
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: 'ly',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: half_hour
  }
}))

app.use(logger('dev'))
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
app.use(cookieParser())

app.use(helmet.hidePoweredBy())
app.use(helmet.frameguard())

// app.use(csurf()) // 防止跨站请求伪造

const debug = require('debug')('ly-expres-mongo')

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