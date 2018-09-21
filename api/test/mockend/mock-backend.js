'use strict'
//const { host, sessionSecret } = require('../../src/config/config')
const express = require('express')
const router = express.Router()
const logger = require('morgan')
//const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const order = require('../controllers/order')
//const router = express.Router()
//const mongoose = require('mongoose')
//const passport = require('passport')
//const session = require('express-session')
//const MongoStore = require('connect-mongo')(session)
//const router = require('../src/routes')
//require('./config/passport')(passport)
//const { startApp } = require('../../src/startApp')

const app = express()
app.use(logger('dev'))

// CORS

const cors = function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', host)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, X-AUTHENTICATION, X-IP, Content-Type, Accept, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  )
  return next()
}
app.use(cors)

// SESSION

app.use(bodyParser.json())
//app.use(cookieParser(sessionSecret))
app.use(bodyParser.urlencoded({ extended: true }))
//app.set('trust proxy', 1)

/*app.use(
  session({
    secret: sessionSecret,
    cookie: { maxAge: 3000000 },
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      clear_interval: '3000000'
    })
  })
)*/

//app.use(passport.initialize())
//app.use(passport.session())

// ROUTES

//app.use(express.static('./dist'))
//app.use('/', router)

/* app.get('*', (req, res) => {
  res.sendFile('index.html', { root: './dist' })
}) */
app.use('/', router)
router.get('/api/v1/orders', order.getAllOrders())
router.get(`/api/v1/orders/page/:pageId/:pageSize/:toDate/:fromDate`, order.getOrders())
router.get(`/api/v1/orders/:id/`, order.getOrder())
router.post(`/api/v1/orders/:type/`, order.postOrder())

// ERROR HANDLING

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})

// STARTUP
//startApp(app)

//const { host, mongoDb, port, api } = require('./config/')
const host = 'localhost'
const port = 6996
try {
  console.log(`Starting Basta mock backend`)
  app.listen(port, () => {
    console.log(`Done. I am listening on ${host}:${port}`)
  })
} catch (err) {
  throw new Error('Error starting express server:', err)
}

module.exports = app
