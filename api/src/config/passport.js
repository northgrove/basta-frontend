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
const msgraph = require('../controllers/msgraph')
const { UserMongoSchema } = require('../models/userMongoSchema')
const save = require('./saveUser')
const Cookies = require('js-cookie')
//const Cookies = require
let arrRoles = ''

module.exports = passport => {
  // (DE)SERIALIZE USER

  passport.serializeUser((user, done) => {
    done(null, user.oid)
  })

  passport.deserializeUser((oid, done) => {
    // UserMongoSchema.findById(id, (err, user) => {
    //   done(err, user)
    // })

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
        console.log('session ', req.session)
        //Cookies.set('userID', profile.id)
        process.nextTick(() => {
          /*
          UserMongoSchema.findOne({ 'azure.id': profile.oid }, (err, user) => {
            // console.log(req)

            if (err) {
              // console.log(err)
              return done(err)
            }
            if (user) {
              console.log('user found in DB: ' + user.azure.upn)
              // console.log(accessToken)
              // console.log(refreshToken)
              //cookie.set('refreshToken', refreshToken)
              //cookie.set('accessToken', accessToken)
              Cookies.set('refreshToken', refreshToken)
              console.log(Cookies.get('refreshToken'))
              user.azure.refreshToken = refreshToken
              user.azure.accessToken = accessToken
              user.save(err => {
                if (err) {
                  throw err
                }
                return done(null, user, req.session.redirectUrl, accessToken)
              })
            } else {
              // console.log(accessToken)
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
              newUser.azure.accessToken = accessToken
              newUser.azure.refreshToken = refreshToken
              newUser.save(err => {
                if (err) {
                  throw err
                }

                return done(null, newUser)
              })
            }
            // }
          })
          */
          findByOid(profile.oid, function(err, user) {
            if (err) {
              return done(err)
            }
            if (user) {
              //req.session.user = user
            }
            if (!user) {
              arrRoles = getroles.matchRoles({
                groups: profile._json.groups
              })
              // "Auto-registration"
              users.push(profile)

              let newUser = profile
              newUser.upn = profile.upn
              newUser.displayName = profile.name.displayName
              newUser.firstName = profile.name.givenName
              newUser.lastName = profile.name.familyName
              newUser.roles = arrRoles
              //newUser.accessToken = accessToken
              newUser.refreshToken = refreshToken
              //req.session.user = newUser

              //console.log(req.session.user)
              req.session.userid = profile.oid
              req.session.upn = profile.upn
              req.session.firstName = profile.name.givenName
              req.session.lastName = profile.name.familyName
              req.session.displayName = profile.name.displayName
              req.session.roles = arrRoles
              //req.session.accessToken = accessToken
              req.session.refreshToken = refreshToken

              return done(null, newUser)
            }
            return done(null, user)
          })

          /*
          console.log(req.Session)
          if (req.session.user) {
            console.log ('existing user')
            req.session.refreshToken = refreshToken
            req.session.accessToken = accessToken
            return done(null, req.session, req.session.redirectUrl, accessToken)
          } else {
            console.log('new user')
            console.log(profile.oid)
            let user = {}

            user.id = profile.oid
            console.log(user)
            req.session.userupn = profile.upn
            req.session.userfirstName = profile.name.givenName
            req.session.userlastName = profile.name.familyName
            req.session.userdisplayName = profile.name.displayName
            req.session.userroles = arrRoles
            req.session.useraccessToken = accessToken
            req.session.userrefreshToken = refreshToken
            req.session.user = user
            return done()
          }
*/
        })
      }
    )
  )
}
