const token = require('./getAccesstoken')
const config = require('../config/passportConfig')

exports.getToken = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessToken(config.tokenURI)
    res.send(accessToken)
  }
}
exports.getTokenUser = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessTokenUser(
      config.tokenURI,
      req.user.azure.refreshToken,
      req
    )
    res.send(accessToken)
  }
}
