const passport = require('passport')
const { logoutURL } = require('../config/passportConfig')
const token = require('./token')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    const concatUrl = params => {
      let string = ''
      Object.keys(params).forEach(e => {
        if (params[e]) string = `${string}/${params[e]}`
      })
      return string.toString()
    }
    req.session.redirectUrl = concatUrl(req.params)
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        // resourceURL: process.env['BASTAAZURECONFIG_CLIENTID'],
        successRedirect: '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

exports.authenticateAzureCallback = () => {
  return (req, res, next) => {
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: req.session.redirectUrl || '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

// AUTHENTICATION CHECK

exports.ensureAuthenticated = () => {
  return async (req, res, next) => {
    console.log('auth:  ', req.isAuthenticated())
    if (req.isAuthenticated()) {
      // console.log('oid: ', req.session.userid)
      resource = process.env['BASTAAZURECONFIG_CLIENTID']
      /*      const bastaToken = await token.validateRefreshAndGetToken(
        req.session.userid,
        req.session.refreshToken,
        resource
      ) */
      return next()
    }
    //res.statusMessage = 'Not authenticated'
    //res.status(401).end()

    res.redirect('/login')
  }
}

// LOGOUT

exports.logout = () => {
  return (req, res) => {
    try {
      req.logout()
      res.redirect(logoutURL)
      req.session = null
      //req.session.destroy(err => {

      //res.status(200)
      //})
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
      return `ERROR during logout: ${err}`
    }
  }
}
