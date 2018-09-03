const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const order = require('../controllers/order')
const user = require('../controllers/user')
const selftest = require('../controllers/selftest')
const msgraph = require('../controllers/msgraph')
const { api } = require('../config/config')

// APPLICATION HEALTH
router.get('/isalive', (req, res) => {
  res.sendStatus(200)
})
router.get('/selftest', selftest.selftest)

router.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType)
  res.end(prometheus.register.metrics())
})

// AUTHENTICATION

router.get(`/login`, auth.authenticateAzure())

router.get(`/login/*`, auth.authenticateAzureWithRedirect())

router.post('/auth/openid/callback', auth.authenticateAzure())

router.get(`${api}/auth/logout`, auth.logOut())

// USER

router.get(`${api}/user/profile`, auth.ensureAuthenticated(), user.getUserProfile())

router.get(`${api}/user/session`, auth.ensureAuthenticated(), user.userSessionLookup())

// get azure ad user photo
router.get('/token', async function(req, res, user) {
  const userPhoto = await msgraph.getUserPhoto({ userUpn: req.headers.userupn })
  res.send(userPhoto)
})
// ORDERS

router.get(
  `${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`,
  auth.ensureAuthenticated(),
  order.getOrders()
)

router.get(`${api}/orders/:id/`, auth.ensureAuthenticated(), order.getOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, auth.ensureAuthenticated(), order.getStatusLog())

// CREATE
router.post(`${api}/create/:type/`, order.postOrder())

module.exports = router
