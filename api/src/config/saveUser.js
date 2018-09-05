const getroles = require('../controllers/getroles')
const { UserMongoSchema } = require('../models/userMongoSchema')
let arrRoles = ''

exports.saveUser = profile => {
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
  newUser.save(err => {
    if (err) {
      throw err
    }

    return newUser
  })
}
