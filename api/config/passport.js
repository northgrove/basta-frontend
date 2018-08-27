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
            if (err) {
              return done(err)
            }
            if (user) {
              console.log('user found in DB: ' + user)
              return done(null, user)
            } else {
              let newUser = new UserMongoSchema()
              newUser.azure.id = profile.oid
              newUser.azure.upn = profile.upn
              newUser.azure.firstName = profile.name.givenName
              newUser.azure.lastName = profile.name.familyName
              newUser.azure.displayName = profile.displayName
              newUser.azure.groups = profile._json.groups
              newUser.save(err => {
                if (err) {
                  throw err
                }
                return done(null, newUser)
              })
            }
          })
        })
      }
    )
  )
}
