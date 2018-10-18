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
  loggingLevel,
  cookieEncryptionKeys,
  useCookieInsteadOfSession
} = require('./passportConfig')
const getroles = require('../controllers/getroles')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
let arrRoles = ''

module.exports = passport => {
  // (DE)SERIALIZE USER

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    findByOid(oid, function(err, user) {
      done(err, user)
    })
  })

  var users = []

  var findByOid = function(oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i]
      console.log('we are using user: ', user.upn)
      if (user.oid === oid) {
        return fn(null, user)
      }
    }
    return fn(null, null)
  }

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
        loggingLevel: loggingLevel,
        cookieEncryptionKeys: cookieEncryptionKeys,
        useCookieInsteadOfSession: useCookieInsteadOfSession
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        //console.log('req i passport', profile)
        //console.log('session ', req.session)
        process.nextTick(() => {
          findByOid(profile.oid, function(err, user) {
            if (err) {
              return done(err)
            }
            if (!user) {
              arrRoles = getroles.matchRoles({
                groups: profile._json.groups
              })

              users.push(profile)

              let newUser = profile
              newUser.upn = profile.upn
              newUser.displayName = profile.name.displayName
              newUser.firstName = profile.name.givenName
              newUser.lastName = profile.name.familyName
              newUser.roles = arrRoles
              newUser.refreshToken = refreshToken

              req.session.userid = profile.oid
              req.session.upn = profile.upn
              req.session.firstName = profile.name.givenName
              req.session.lastName = profile.name.familyName
              req.session.displayName = profile.name.displayName
              req.session.roles = arrRoles
              req.session.refreshToken = refreshToken

              return done(null, newUser)
            }
            return done(null, user)
          })
        })
      }
    )
  )
}
