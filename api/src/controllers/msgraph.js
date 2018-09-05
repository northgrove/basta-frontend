const request = require('request-promise').defaults({ encoding: null })
const token = require('./getAccesstoken')

exports.getUserPhoto = async ({ userUpn }) => {
  let userPhoto = ''
  const aToken = await token.getAccessToken()
  try {
    return request
      .get({
        headers: { 'content-type': 'image/jpg' },
        url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
        auth: { bearer: aToken }
      })
      .then(response => {
        console.log(response.status)
        userPhoto = 'data:image/jpg;base64,' + new Buffer(response).toString('base64')
        return userPhoto
      })
      .catch(err => {
        console.log('No picture found for user')
        return null
      })
  } catch (err) {
    throw err
  }
}
