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
    console.log('user: ' + req.user)
    //   console.log('req: ' + req)
    res.redirect('/')
  }
)

// not used - needed?
//router.get('/auth/openid', ensureAuthenticated, () =>{} )

router.get(`${api}/auth/session`, auth.ensureAuthenticated(), (req, res, user) => {
  res.status(200).send({
    userName: user.upn
    //  firstName: profile.name.given_name,
    //  lastName: profile.name.family_name,
    //  roles: profile.groups
  })

  // console.log('User: ' + profile.displayName)
})
// router.post('/auth/openid/callback', auth.authenticateAzure())

// ORDERS

router.get(
  `${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`,
  auth.ensureAuthenticated(),
  mock.getOrders()
)

router.get(`${api}/orders/:id/`, auth.ensureAuthenticated(), mock.getOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, auth.ensureAuthenticated(), mock.getStatusLog())

module.exports = router
