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
const finduser = require('./findUser')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
let arrRoles = ''
let tokenExpire = ''

module.exports = passport => {
  // (DE)SERIALIZE USER

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    finduser.findByOid(oid, function(err, user) {
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
        loggingLevel: loggingLevel,
        cookieEncryptionKeys: cookieEncryptionKeys,
        useCookieInsteadOfSession: useCookieInsteadOfSession
      },
      (req, iss, sub, profile, accessToken, refreshToken, done) => {
        process.nextTick(() => {
          /*const atSplit = accessToken.split('.')
          console.log(accessToken)
          const atDecoded = Buffer.from(atSplit[1], 'base64').toString()
          console.log('decoded: ', atDecoded)
          console.log('profile ', profile)
          */
          finduser.findByOid(profile.oid, function(err, user) {
            if (err) {
              console.log('error: ', err)
              return done(err)
            }
            console.log('user1 :', user)
            if (!user) {
              const now = new Date()
              console.log(now)
              const tokenExpire = Date.parse(now) //.setMinutes(now.getMinutes() + 1);
              console.log(Date.parse(now))
              console.log(tokenExpire)
              arrRoles = getroles.matchRoles(profile._json.groups)

              let newUser = {}
              newUser.oid = profile.oid
              newUser.upn = profile.upn
              newUser.displayName = profile.displayName
              newUser.firstName = profile.name.givenName
              newUser.lastName = profile.name.familyName
              newUser.roles = arrRoles
              newUser.refreshToken = refreshToken
              newUser.accessToken = accessToken
              newUser.tokenExpire = tokenExpire
              finduser.users.push(newUser)

              req.session.userid = profile.oid
              req.session.upn = profile.upn
              req.session.firstName = profile.name.givenName
              req.session.lastName = profile.name.familyName
              req.session.displayName = profile.displayName
              req.session.roles = arrRoles
              req.session.refreshToken = refreshToken
              //console.log('session: ', req.session)
              //console.log('newuser: ', newUser)
              return done(null, newUser)
            }
            //console.log('user: ', user)
            req.session.userid = user.oid
            req.session.upn = user.upn
            req.session.firstName = user.name.givenName
            req.session.lastName = user.name.familyName
            req.session.displayName = user.displayName
            req.session.roles = arrRoles
            req.session.refreshToken = refreshToken
            return done(null, user)
          })
        })
      }
    )
  )
}
