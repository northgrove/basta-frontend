// const request = require('request-promise')
const request = require('request').defaults({ encoding: null })
const token = require('./getAccesstoken')

exports.getUserPhoto = async ({ userUpn }) => {
  const aToken = await token.getAccessToken()
  // console.log(aToken)
  /*
  const rawPhoto = await request.get({
    headers: { 'content-type': 'image/jpg' },
    url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
    auth: { bearer: aToken }
  })
  //console.log(rawPhoto)
  const buffer = rawPhoto;
  const photo64 = .btoa(rawPhoto)
  const userPhoto = photo64
  console.log(photo64)
  return userPhoto
  */

  request.get(
    {
      headers: { 'content-type': 'image/jpg' },
      url: `https://graph.microsoft.com/beta/users/${userUpn}/photo/$value`,
      auth: { bearer: aToken }
    },
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        userPhoto =
          'data:' +
          response.headers['content-type'] +
          ';base64,' +
          new Buffer(body).toString('base64')

        return userPhoto
      }
    }
  )

  return userPhoto
}

exports.proxyUserPhoto = async ({ userUpn }) => {
  const proxyPhoto = await request.get({
    url: 'http://localhost:8080/token',
    headers: { userUpn: userUpn }
  })
}
