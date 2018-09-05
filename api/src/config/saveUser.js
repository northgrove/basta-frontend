const getroles = require('../controllers/getroles')
const msgraph = require('../controllers/msgraph')
const { UserMongoSchema } = require('../models/userMongoSchema')
let arrRoles = ''

exports.saveUser = async profile => {
  arrRoles = getroles.matchRoles({
    groups: profile._json.groups
  })
  console.log('new user')
  let newUser = new UserMongoSchema()
  const userPhoto = await msgraph.getUserPhoto({ userUpn: profile._json.upn })
  console.log('photo: ', userPhoto)
  newUser.azure.id = profile.oid
  newUser.azure.upn = profile.upn
  newUser.azure.firstName = profile.name.givenName
  newUser.azure.lastName = profile.name.familyName
  newUser.azure.displayName = profile.displayName
  newUser.roles = arrRoles
  newUser.photo = userPhoto
  newUser.save(err => {
    if (err) {
      throw err
    }

    return newUser
  })
}
