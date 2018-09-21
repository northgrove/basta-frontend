const request = require('request-promise')
const config = require('../config/passportConfig')
const { UserMongoSchema } = require('../models/userMongoSchema')
let ms_access_token = ''

exports.getAccessToken = async tokenURI => {
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

exports.getAccessTokenUser = async (tokenURI, refreshToken, req) => {
  let parameters = ''
  try {
    parameters = {
      client_id: process.env['BASTAAZURECONFIG_CLIENTID'],
      resource: process.env['BASTAAZURECONFIG_CLIENTID'],
      redirect_uri: process.env['BASTAAZURECONFIG_CALLBACKURI'],
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_secret: process.env['BASTAAZURECONFIG_CLIENTSECRET']
    }
    await request.post({ url: tokenURI, formData: parameters }, function callback(
      err,
      httpResponse,
      body
    ) {
      ms_access_token = JSON.parse(body).access_token
      UserMongoSchema.findOneAndUpdate(
        { 'azure.id': req.user.azure.id },
        { 'azure.accessToken': ms_access_token },
        { new: true },
        (err, rawResponse) => {
          return ms_access_token
        }
      )

      // console.log('access token: ', ms_access_token)
    })
    return ms_access_token
  } catch (e) {
    //console.error('Could not get access_token', e)
    return e
  }
}
