const request = require('request-promise').defaults({ encoding: null })
const token = require('./getAccesstoken')
const { tokenURI } = require('../config/passportConfig')
const { defaultPhoto } = require('./defaultPhoto')

exports.getUserPhoto = async ({ userUpn, refreshToken }) => {
  let userPhoto = ''
  let aToken = ''
  const resource = 'https://graph.microsoft.com'
  const accessToken = await token.getAccessTokenUser(tokenURI, refreshToken, resource)
  // console.log('token: ', accessToken)
  return request
    .get({
      headers: { 'content-type': 'image/jpg' },
      url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
      auth: { bearer: accessToken }
    })
    .then(response => {
      userPhoto = 'data:image/jpg;base64,' + new Buffer(response).toString('base64')

      return userPhoto
    })
    .catch(err => {
      // console.log(err)
      userPhoto = defaultPhoto
      return userPhoto
    })
}
