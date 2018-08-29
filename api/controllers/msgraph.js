const request = require('request-promise')
const token = require('./getAccesstoken')

exports.getUserPhoto = async ({ user }) => {
  const aToken = await token.getAccessToken()
  console.log(aToken)

  const groupExist = await request.get({
    headers: { 'content-type': 'application/json' },
    url: `https://graph.microsoft.com/beta/users/${user}/photo/$value`,
    auth: { bearer: aToken }
  })

  const result = JSON.parse(groupExist)
  console.log('result: ', result)
}
