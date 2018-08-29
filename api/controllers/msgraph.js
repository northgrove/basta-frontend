const request = require('request-promise')
const token = require('./getAccesstoken')

exports.getUserPhoto = async ({ user, code }) => {
  const aToken = await token.getAccessToken({ code: code })
  // console.log(aToken)

  const userPhoto = await request.get({
    headers: { 'content-type': 'application/json' },
    url: `https://graph.microsoft.com/beta/users/${user}/photo/$value`,
    auth: { bearer: aToken }
  })

  return userPhoto
}
