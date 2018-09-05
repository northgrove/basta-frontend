const passport = require('passport')

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
        res.status(200).redirect('/')
      })
    } catch (err) {
      res.status(500).send(err)
      return `ERROR during logout: ${err}`
    }
  }
}
