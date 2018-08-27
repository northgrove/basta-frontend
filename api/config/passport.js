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
const getroles = require('./getroles')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const { UserMongoSchema } = require('../models/userMongoSchema')
let arrRoles = ''

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
              console.log('user found in DB: ' + user.azure.upn)
              arrRoles = getroles.matchRoles({
                groups: user.azure.groups
              })
              return done(null, user)
            } else {
              arrRoles = getroles.matchRoles({
                groups: profile._json.groups
              })
              let newUser = new UserMongoSchema()
              newUser.azure.id = profile.oid
              newUser.azure.upn = profile.upn
              newUser.azure.firstName = profile.name.givenName
              newUser.azure.lastName = profile.name.familyName
              newUser.azure.displayName = profile.displayName
              newUser.azure.groups = profile._json.groups
              newUser.roles = arrRoles
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
