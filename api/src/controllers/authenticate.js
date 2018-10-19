const passport = require('passport')
const { logoutURL } = require('../config/passportConfig')
// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  console.log('authenticatin azure')

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
        resourceURL: 'https://graph.microsoft.com',
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
  return (req, res, next) => {
    console.log('Ensure authenticated')

    if (req.isAuthenticated()) return next()
    res.statusMessage = 'Not authenticated'
    res.status(401).end()
    //res.redirect('/login')
  }
}

// LOGOUT

exports.logout = () => {
  return (req, res) => {
    try {
      // req.session.destroy()
      req.session.destroy(err => {
        req.logout()
        res.redirect(logoutURL)
        //res.status(200)
      })
    } catch (err) {
      res.status(500).send(err)
      return `ERROR during logout: ${err}`
    }
  }
}
