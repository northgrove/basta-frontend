const msgraph = require('../controllers/msgraph')

// USER SESSION

exports.getUserProfile = () => {
  console.log('getting user profile ')

  return async (req, res) => {
    console.log(req.session)
    const userPhoto = await msgraph.getUserPhoto({
      userUpn: req.session.upn,
      refreshToken: req.session.refreshToken
    })
    const user = {
      userName: req.session.upn,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      displayName: req.session.displayName,
      roles: req.session.roles,
      photo: userPhoto
    }
    res.status(200).send(user)
  }
}

exports.userSessionLookup = () => {
  return (req, res) => {
    //console.log(req.session)
    res.status(200).send({
      session: 'active'
    })
  }
}
