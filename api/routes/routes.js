const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../controllers/authenticate')
const mock = require('../controllers/mock')
const { api } = require('../config/config')

// AUTHENTICATION

// do login
router.get(
  `/login`,
  (req, res, next) => {
    passport.authenticate('azuread-openidconnect', {
      response: res, // required
      failureRedirect: '/error'
    })(req, res, next)
  },
  (req, res) => {
    console.log('Login was called in the Sample')
    res.redirect('/')
  }
)

// handle callback from login
router.post(
  '/auth/openid/callback',
  (req, res, next) => {
    passport.authenticate(
      'azuread-openidconnect',
      {
        response: res, // required
        failureRedirect: '/error'
      },
      console.log(req.body.id_token)
    )(req, res, next)
  },
  (req, res) => {
    console.log('We received a return from AzureAD.')
    res.redirect('/')
  }
)

// check if authenticated
function ensureAuthenticated(req, res, next) {
  console.log('isLoggedIn:', req.isAuthenticated())
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

// not used - needed?
router.get('/auth/openid', auth.authenticateAzure())

router.get(`${api}/auth/session`, ensureAuthenticated, (req, res) => {
  res.status(200).send({
    userName: 'h141513',
    firstName: 'Even',
    lastName: 'Haasted',
    roles: ['MASTER_OF_THE_UNIVERSE', 'KJIP_KAR']
  })
})
// router.post('/auth/openid/callback', auth.authenticateAzure())

// ORDERS

router.get(
  `${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`,
  ensureAuthenticated,
  mock.getOrders()
)

router.get(`${api}/orders/:id/`, ensureAuthenticated, mock.getOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, ensureAuthenticated, mock.getStatusLog())

module.exports = router
