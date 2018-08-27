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

  /*
    let users = [];

    let findByOid = function(oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        console.log('we are using user: ', user);
        if (user.oid === oid) {
        return fn(null, user);
        }
    }
    return fn(null, null);
    };
    */
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
          UserMongoSchema.findOne({ 'azure.id': profile.id }, (err, user) => {
            if (err) {
              console.log('error: ' + err)
              return done(err)
            }
            {
              let newUser = new UserMongoSchema()
              newUser.azure.id = profile.id
              newUser.azure.token = profile.token
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
