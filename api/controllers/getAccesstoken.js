const request = require('request-promise')
const config = require('../config/passportConfig')
let ms_access_token = ''

exports.getAccessToken = async () => {
  try {
    // Setter parametere for Login URL mot graph.microsoft.com
    const parameters = {
      grant_type: 'client_credentials',
      client_id: config.clientID,
      client_secret: config.clientSecret,
      resource: config.resourceURL
    }

    const tokenURI = `https://login.microsoftonline.com/${config.tenantid}/oauth2/token`
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token
      console.log('access token: ', ms_access_token)
      return ms_access_token
    })
    return ms_access_token
  } catch (e) {
    console.error('Could not get access_token', e)
    throw e
  }
}
