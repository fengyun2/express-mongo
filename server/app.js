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

import './db'

// 实例化
const app = express()

// for raw data
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = ''
    req.setEncoding('utf8')
    req.on('data', function(chunk){ req.text += chunk })
    req.on('end', next)
  } else {
    next()
  }
})

// 支持跨域
const half_hour = 3600000 / 2
app.use(require('cors')())

// 设置session
app.use(session({
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  secret: 'ly',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: half_hour
  }
}))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

const debug = require('debug')('ly-expres-mongo')

app.all('/', (req, res, next) => {
  console.log(`receive /`)
  res.end('Hello World!')
  next()
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers development error handler will print stacktrace
if (app.get('env') === 'development') {
  app
    .use(function (err, req, res, next) {
      res.status(err.status || 500)
      res.end(`some error: ${err.status}`)
      next()
    })
}

// production error handler no stacktraces leaked to user
app
  .use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.end(`some error: ${err.status}`)
    next()
  })


app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${server.address().port}`)
  debug(`Express server listening on port ${server.address().port}`)
})

export default app