const express = require('express')
const router = express.Router()
const logger = require('morgan')
const bodyParser = require('body-parser')
const token = require('./auth-getToken')

//var aad = require('azure-ad-jwt');

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use('/', router)

// ERROR HANDLING
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).send(err)
  next()
})

// STARTUP
const host = 'localhost'
const port = 5050
try {
  console.log(`Starting Basta AAD Auth backend`)
  app.listen(port, () => {
    console.log(`Done. I am listening on ${host}:${port}`)
  })
} catch (err) {
  throw new Error('Error starting express server:', err)
}

app.get('/auth', token.getToken())

module.exports = app
