const proxy = require('http-proxy-middleware')
const token = require('./token')

exports.doProxy = () => {
  return proxy('/rest', {
    target: `${process.env.BASTA_BACKEND}`,
    secure: true,
    changeOrigin: true,
    logLevel: 'debug',
    onError: (err, req, res) => {
      console.log('error in proxy', err)
    }
  })
}

exports.attachToken = () => {
  return async (req, res, next) => {
    resource = process.env['BASTAAZURECONFIG_CLIENTID']
    const accessToken = await token.validateRefreshAndGetToken(
      req.session.userid,
      req.session.refreshToken,
      resource
    )
    req.headers['Authorization'] = `Bearer ${accessToken}`
    return next()
  }
}
