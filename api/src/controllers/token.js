const token = require('./getAccesstoken')
const config = require('../config/passportConfig')
const request = require('request-promise')
const finduser = require('../config/findUser')

exports.getToken = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessToken(
      config.tokenURI,
      'b36e92f3-d48b-473d-8f69-e7887457bd3f'
    )
    res.send(accessToken)
  }
}
exports.getTokenUser = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessTokenUser(
      config.tokenURI,
      req.user.azure.refreshToken,
      'b36e92f3-d48b-473d-8f69-e7887457bd3f'
    )
    res.send(accessToken)
  }
}

exports.verifyToken = () => {
  return async (req, res) => {
    const accessToken = await token.getAccessTokenUser(
      config.tokenURI,
      req.user.azure.refreshToken,
      'b36e92f3-d48b-473d-8f69-e7887457bd3f'
    )
    return request
      .get({
        url: `http://localhost:5050/auth`,
        auth: { bearer: accessToken }
      })
      .then(response => {
        console.log(response)

        res.send(response)
      })
      .catch(err => {
        console.log(err)

        res.send(err)
      })
  }
}

exports.validateRefreshAndGetToken = (userid, refreshToken, resource) => {
  const now = new Date()
  finduser.findByOid(userid, async function(err, user) {
    //console.log('user: ', user)
    try {
      oldAccessToken = user.tokens.find(token => token.resource === resource).accesstoken
    } catch {
      oldAccessToken = false
    }
    if (user && !oldAccessToken) {
      console.log('found user but no existing accesstoken for ', resource)
      const newAccessToken = await token.getAccessTokenUser(config.tokenURI, refreshToken, resource)
      exp = JSON.parse(exports.decodeToken(newAccessToken)).exp //now.setMinutes(now.getMinutes() + 55)
      user.tokens = [{ resource: resource, accesstoken: newAccessToken, exp: exp }]

      finduser.users.push(user.tokens)
      return newAccessToken
    }
    if (user && oldAccessToken) {
      console.log('found user and existing accesstoken for', resource)
      const oldtokenExpire = user.tokens.find(token => token.resource === resource).exp
      console.log(
        'accessToken expire',
        new Date(oldtokenExpire * 1000) + ' = ' + (oldtokenExpire * 1000 - Date.parse(now)) + ' ms'
      )
      //console.log('user: ', user)

      if (oldtokenExpire * 1000 < Date.parse(now)) {
        //console.log('tokenExpire: ', req.session.tokenExpire)
        //resource = 'b36e92f3-d48b-473d-8f69-e7887457bd3f'
        //console.log('tokenuri: ', tokenURI)
        const newAccessToken = await token.getAccessTokenUser(
          config.tokenURI,
          refreshToken,
          resource
        )
        //console.log('oldaccesstoken: ', user.accessToken)
        // console.log('newAccesstoken2: ', newAccessToken)
        console.log('Getting new accessToken for', resource)
        //console.log(newAccessToken)
        //console.log(JSON.parse(exports.decodeToken(newAccessToken)).exp)
        exp = JSON.parse(exports.decodeToken(newAccessToken)).exp //now.setMinutes(now.getMinutes() + 55)
        user.tokens = [{ resource: resource, accesstoken: newAccessToken, exp: exp }]

        finduser.users.push(user.tokens)
        //console.log('user1: ', user)
        //console.log('toekns: ', user.tokens)
        //const accessToken = user.tokens.find(token => token.resource === resource).accesstoken
        //console.log(tokentest)
        return newAccessToken
      } else {
        console.log('token stil valid for', resource)
      }
    }

    return oldAccessToken
  })
  return 'error'
}

exports.decodeToken = encodedToken => {
  if (encodedToken) {
    if (encodedToken.startsWith('eyJ0')) {
      const tokenSplit = encodedToken.split('.')
      const tokenDecoded = Buffer.from(tokenSplit[1], 'base64').toString()
      //console.log(tokenDecoded)
      return tokenDecoded
    } else {
      console.log('token decode error')
      return new Error('not a valid accessToken or id_token')
    }
  } else {
    console.log('no token in input')
    return new Error('no token in input')
  }
}
