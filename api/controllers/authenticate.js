const passport = require('passport')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    passport.authenticate('azuread-openidconnect', {
      response: res,
      failureRedirect: '/'
    })(req, res, next)
  }
}

exports.authenticateAzureWithRedirect = () => {
  return (req, res, next) => {
    passport.authenticate('azuread-openidconnect', {
      response: res,
      failureRedirect: '/'
    })(req, res, next)
  }
}

exports.authenticateAzureCallback = () => {
  return (
    (req, res, next) => {
      passport.authenticate('azuread-openidconnect', {
        response: res,
        failureRedirect: '/'
      })(req, res, next)
    },
    (req, res) => {
      res.redirect('/')
    }
  )
}

// AUTHENTICATION CHECK

exports.ensureAuthenticated = () => {
  if (process.env['NODE_ENV'] === 'offline') {
    return (req, res, next) => next()
  } else {
    return (req, res, next) => {
      console.log(req.isAuthenticated())
      if (req.isAuthenticated()) return next()
      res.statusMessage = 'Not authenticated'
      res.status(401).end()
    }
  }
}

// USER SESSION

exports.userSessionLookup = () => {
  return (req, res, user) => {
    const userObj = {
      userName: req.user.azure.upn,
      firstName: req.user.azure.firstName,
      lastName: req.user.azure.lastName,
      displayName: req.user.azure.displayName,
      roles: req.user.roles,
      code: req.user.azure.code
    }
    res.status(200).send(userObj)
  }
}
