const msgraph = require('../controllers/msgraph')

// USER SESSION

exports.getUserProfile = () => {
  return async (req, res) => {
    const userPhoto = await msgraph.getUserPhoto({
      userId: req.session.userid,
      refreshToken: req.session.refreshToken,
      userUpn: req.session.upn
    })
    const user = {
      userName: req.session.upn,
      firstName: req.session.firstName,
      lastName: req.session.lastName,
      displayName: req.session.displayName,
      roles: req.session.roles,
      photo: userPhoto
    }
    //console.log(user)
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
