const { tokenURI } = require('../config/passportConfig')
const finduser = require('../config/findUser')
const token = require('./getAccesstoken')

exports.sjekkToken = (userid, refreshToken) => {
  const now = new Date()
  finduser.findByOid(userid, async function(err, user) {
    if (err) {
      console.log('error: ', err)
      return done(err)
    }
    if (user) {
      console.log(
        'accessToken expire',
        new Date(user.tokenExpire) + ' = ' + (user.tokenExpire - Date.parse(now)) + ' ms'
      )
      //console.log('user: ', user)
      if (user.tokenExpire < Date.parse(now)) {
        //console.log('tokenExpire: ', req.session.tokenExpire)
        resource = 'b36e92f3-d48b-473d-8f69-e7887457bd3f'
        //console.log('tokenuri: ', tokenURI)
        const newAccessToken = await token.getAccessTokenUser(tokenURI, refreshToken, resource)
        //console.log('oldaccesstoken: ', user.accessToken)
        // console.log('newAccesstoken2: ', newAccessToken)
        console.log('Getting new accessToken...')
        user.accessToken = newAccessToken
        user.tokenExpire = now.setMinutes(now.getMinutes() + 55)
        finduser.users.push(user)
        return
      }
    }
    return
  })
  return
}
