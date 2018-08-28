const passport = require('passport')

// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
  return (req, res, next) => {
    passport.authenticate('azuread-openidconnect', () => {})(req, res, next)
  }
}

// check if authenticated
exports.ensureAuthenticated = () => {
  return (req, res, next) => {
    console.log('isLoggedIn:', req.isAuthenticated())
    if (req.isAuthenticated()) {
      return next()
    }
    res.send(401).send('Not authorized')
  }
}
