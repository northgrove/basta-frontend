const token = require('./getAccesstoken')
const config = require('../config/passportConfig')
const request = require('request-promise')

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

exports.verifyToken = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessTokenUser(
      config.tokenURI,
      req.user.azure.refreshToken,
      'b36e92f3-d48b-473d-8f69-e7887457bd3f'
    )
    console.log('jau: ', accessToken)
    return request
      .get({
        url: `http://localhost:5050/auth`,
        auth: { bearer: accessToken }
      })
      .then(response => {
        console.log(response)

        res.send(response)
      })
      .catch(err => {
        console.log(err)

        res.send(err)
      })
  }
}
