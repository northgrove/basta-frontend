const {
  identityMetadata,
  clientID,
  clientSecret,
  responseType,
  responseMode,
  redirectUrl,
  passReqToCallback,
  scope,
  allowHttpForRedirectUrl,
  validateIssuer,
  loggingLevel
} = require('./passportConfig')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const { UserMongoSchema } = require('../models/userMongoSchema')

module.exports = passport => {
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

  passport.use(
    'azuread-openidconnect',
    new OIDCStrategy(
      {
        identityMetadata: identityMetadata,
        clientID: clientID,
        clientSecret: clientSecret,
        responseType: responseType,
        responseMode: responseMode,
        redirectUrl: redirectUrl,
        passReqToCallback: passReqToCallback,
        scope: scope,
        allowHttpForRedirectUrl: allowHttpForRedirectUrl,
        validateIssuer: validateIssuer,
        loggingLevel: loggingLevel
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'azure.id': profile.oid }, (err, user) => {
            console.log('id: ' + profile.token)
            if (err) {
              console.log('error: ' + err)
              return done(err)
            }
            if (user) {
              console.log('user found in DB: ' + user)
              return done(null, user)
            } else {
              console.log('create new user' + newUser)
              let newUser = new UserMongoSchema()
              newUser.azure.id = profile.oid
              newUser.azure.upn = profile.upn
              newUser.azure.firstName = profile.given_name
              newUser.azure.lastName = profile.family_name
              newUser.azure.displayName = profile.displayName
              newUser.azure.groups = profile.groups
              newUser.save(err => {
                if (err) {
                  throw err
                }
                console.log(profile)
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
}
