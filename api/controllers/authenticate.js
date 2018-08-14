const passport = require('passport')


// AZURE AUTHENTICATE

exports.authenticateAzure = () => {
    return (req, res, next) => {
        passport.authenticate('azuread-openidconnect', () => {

        })(req, res, next)
    }
}
