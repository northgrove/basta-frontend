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
const getroles = require('../controllers/getroles')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const msgraph = require('../controllers/msgraph')
const { UserMongoSchema } = require('../models/userMongoSchema')
const save = require('./saveUser')
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
        // console.log('req i passport', profile)
        process.nextTick(() => {
          UserMongoSchema.findOne({ 'azure.id': profile.oid }, (err, user) => {
            // console.log(req)

            if (err) {
              // console.log(err)
              return done(err)
            }
            if (user) {
              console.log('user found in DB: ' + user.azure.upn)
              // console.log(accessToken)
              return done(null, user, req.session.redirectUrl, accessToken)
            } else {
              // console.log(accessToken)
              console.log(req)
              console.log(profile)
              arrRoles = getroles.matchRoles({
                groups: profile._json.groups
              })
              console.log('new user')
              let newUser = new UserMongoSchema()
              newUser.azure.id = profile.oid
              newUser.azure.upn = profile.upn
              newUser.azure.firstName = profile.name.givenName
              newUser.azure.lastName = profile.name.familyName
              newUser.azure.displayName = profile.displayName
              newUser.roles = arrRoles
              newUser.azure.code = req.body.code
              newUser.azure.accessToken = accessToken
              newUser.save(err => {
                if (err) {
                  throw err
                }

                return done(null, newUser)
              })
            }
            // }
          })
        })
      }
    )
  )
}
