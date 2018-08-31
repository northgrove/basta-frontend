const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../controllers/authenticate')
const mock = require('../controllers/mock')
const msgraph = require('../controllers/msgraph')
const { api } = require('../config/config')
const { UserMongoSchema } = require('../models/userMongoSchema')

// AUTHENTICATION

router.get(`/login`, auth.authenticateAzure())

router.get(`/login/*`, auth.authenticateAzureWithRedirect())

router.post('/auth/openid/callback', auth.authenticateAzureCallback())

// router.get(`${api}/auth/session`, auth.ensureAuthenticated(), auth.userSessionLookup())

// get user object if authenticated
router.get(`${api}/auth/session`, auth.ensureAuthenticated(), (req, res, user) => {
  // console.log(req.user.azure.upn)
  if (process.env['NODE_ENV'] === 'offline') {
    res.status(200).send({
      userName: 'mockusername',
      firstName: 'mock',
      lastName: 'name',
      displayName: 'Mock User',
      roles: ['ROLE_SUPERUSER', 'ROLE_OPERATIONS']
    })
  }
  console.log(req.status)
  res.status(200).send({
    userName: req.user.azure.upn,
    firstName: req.user.azure.firstName,
    lastName: req.user.azure.lastName,
    displayName: req.user.azure.displayName,
    roles: req.user.roles,
    code: req.user.azure.code
  })
})

// logout
router.get('/logout', function(req, res) {
  req.session.destroy()
  req.logout()
  // res.redirect('https://www.vg.no')
})

// get azure ad user photo
router.get('/token', async function(req, res, user) {
  const userPhoto = await msgraph.getUserPhoto({ userUpn: req.headers.userupn })
  res.send(userPhoto)
})
// ORDERS

router.get(
  `${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`,
  auth.ensureAuthenticated(),
  mock.getOrders()
)

router.get(`${api}/orders/:id/`, auth.ensureAuthenticated(), mock.getOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, auth.ensureAuthenticated(), mock.getStatusLog())

// CREATE
router.post(`${api}/create/:type/`, (req, res) => {
  // console.log(req.body)
  res.json({ orderId: 4590 })
})

module.exports = router
