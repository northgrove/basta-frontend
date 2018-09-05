const passport = require('passport')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

exports.authenticateAzureWithRedirect = () => {
  return (req, res, next) => {
    try {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        successRedirect: '/',
        failureRedirect: '/error'
      })(req, res, next)
    } catch (err) {
      throw `ERROR during authentication: ${err}`
    }
  }
}

// AUTHENTICATION CHECK

exports.ensureAuthenticated = () => {
  if (process.env['NODE_ENV'] === 'offline') {
    return (req, res, next) => next()
  } else {
    return (req, res, next) => {
      if (req.isAuthenticated()) return next()
      res.statusMessage = 'Not authenticated'
      res.status(401).end()
    }
  }
}

// LOGOUT

exports.logOut = () => {
  return (req, res) => {
    try {
      req.session.destroy(err => {
        res.status(500).send(err)
      })
      res.status(200).redirect('/')
    } catch (err) {
      return `ERROR during logout: ${err}`
    }
  }
}
