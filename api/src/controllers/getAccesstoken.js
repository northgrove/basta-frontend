const request = require('request-promise')
const config = require('../config/passportConfig')
let ms_access_token = ''

exports.getAccessToken = async tokenURI => {
  let parameters = ''
  try {
    // Setter parametere for Login URL mot graph.microsoft.com
    /*
    if (tokenURI.match(/localhost/)) {
      parameters = {
        client_id: 'test_id',
        resource: 'testResource',
        redirect_uri: 'testRedirectURL',
        grant_type: 'Test_client_credentials',
        client_secret: 'testSecret'
      }
    } else {
      */
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: config.resourceURL,
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'client_credentials',
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }

    // }

    // const parameters2 = `client_id=${config.clientID}&scope=${config.resourceURL}&code=${code}&redirect_uri=http://localhost:8080/&grant_type=authorization_code&client_secret=${config.clientSecret}`
    // console.log(parameters)
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
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
