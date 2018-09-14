const request = require('request-promise')
const config = require('../config/passportConfig')
let ms_access_token = ''

getAccessToken = async tokenURI => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: config.resourceURL,
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'client_credentials',
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }
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
    //console.error('Could not get access_token', e)
    return e
  }
}

getAccessTokenUser = async (tokenURI, code) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: process.env['BASTAAZURECONFIG_CLIENTID'],
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'authorization_code',
      code: code,
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }
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
    //console.error('Could not get access_token', e)
    return e
  }
}

exports.getToken = () => {
  return async (req, res) => {
    const token = await getAccessToken(config.tokenURI)
    // console.log(token)
    res.send(token)
  }
}
exports.getTokenUser = () => {
  return async (req, res) => {
    const token = await getAccessTokenUser(config.tokenURI, req.user.azure.code)
    // console.log(token)
    res.send(token)
  }
}

//module.exports = getAccessToken
