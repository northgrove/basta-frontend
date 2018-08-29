const passport = require('passport')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    passport.authenticate('azuread-openidconnect', () => {})(req, res, next)
  }
}

// check if authenticated
exports.ensureAuthenticated = () => {
  if (process.env['NODE_ENV'] === 'offline') {
    return (req, res, next) => next
  }
  return (req, res, next) => {
    console.log('isLoggedIn:', req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login')
  }
}
