const { UserMongoSchema } = require('../models/userMongoSchema')
// const OIDCStrategy = require('passport-azure-ad').OIDCStrategy


module.exports = (passport) => {

    // (DE)SERIALIZE USER

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((id, done) => {
        UserMongoSchema.findById(id, (err, user) => {
            done(err, user)
        })
    })

    // AZURE AD LOGIN STRATEGY

    // passport.use('azuread-openidconnect', new OIDCStrategy({

    // }))
}
