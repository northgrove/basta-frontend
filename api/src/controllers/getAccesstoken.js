const request = require('request-promise')
const config = require('../config/passportConfig')
let ms_access_token = ''

exports.getAccessToken = async tokenURI => {
  try {
    console.log(tokenURI)
    // Setter parametere for Login URL mot graph.microsoft.com
    const parameters = {
      client_id: config.clientID,
      resource: config.resourceURL,
      redirect_uri: config.redirectUrl,
      grant_type: 'client_credentials',
      client_secret: config.clientSecret
    }
    // console.log('code ', code)
    //const parameters2 = `client_id=${config.clientID}&scope=${config.resourceURL}&code=${code}&redirect_uri=http://localhost:8080/&grant_type=authorization_code&client_secret=${config.clientSecret}`

    console.log(parameters)
    // const tokenURI = config.tokenURI
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      console.log(body)
      ms_access_token = JSON.parse(body).access_token
      // console.log('access token: ', ms_access_token)
      return ms_access_token
    })
    return ms_access_token
  } catch (e) {
    console.error('Could not get access_token', e)
    throw e
  }
}
