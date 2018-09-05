const msgraph = require('../controllers/msgraph')

// USER SESSION

exports.getUserProfile = () => {
  return async (req, res) => {
    const userPhoto = await msgraph.getUserPhoto({ userUpn: req.user.azure.upn })
    const user = {
      userName: req.user.azure.upn,
      firstName: req.user.azure.firstName,
      lastName: req.user.azure.lastName,
      displayName: req.user.azure.displayName,
      roles: req.user.roles,
      photo: userPhoto
    }
    res.status(200).send(user)
  }
}

exports.userSessionLookup = () => {
  return (req, res) => {
    res.status(200).send({
      session: 'active'
    })
  }
}
