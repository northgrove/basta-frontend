// USER SESSION

exports.getUserProfile = () => {
  return (req, res) => {
    const user = {
      userName: req.user.azure.upn,
      firstName: req.user.azure.firstName,
      lastName: req.user.azure.lastName,
      displayName: req.user.azure.displayName,
      roles: req.user.roles,
      code: req.user.azure.code
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
