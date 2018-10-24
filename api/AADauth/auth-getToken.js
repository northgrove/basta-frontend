const token = require('../src/controllers/getAccesstoken')
var azureJWT = require('azure-jwt-verify')

exports.getToken = () => {
  return async (req, res) => {
    const passportconfig = 'https://login.microsoftonline.com/navq.onmicrosoft.com/oauth2/token'
    // const accessToken = await token.getAccessTokenUser(passportconfig, req.user.azure.refresToken, 'b36e92f3-d48b-473d-8f69-e7887457bd3f')
    var jwtToken = req.headers.authorization.replace('Bearer ', '') // accessToken //.replace('Bearer ',''); //req.headers.authorization
    console.log(jwtToken)
    const config = {
      JWK_URI: 'https://login.microsoftonline.com/common/discovery/keys',
      ISS: 'https://sts.windows.net/966ac572-f5b7-4bbe-aa88-c76419c0f851/',
      AUD: 'b36e92f3-d48b-473d-8f69-e7887457bd3f'
    }
    azureJWT.verify(jwtToken, config).then(
      function(decoded) {
        // success callback
        //console.log(decoded)
        json = JSON.parse(decoded)
        const currentdate = new Date().getTime() / 1000
        if (currentdate > json.message.exp) {
          console.log('expired')
        }
        console.log(json.message.ipaddr)
        res.send(decoded)
      },
      function(error) {
        // error callback
        console.log(error)
        res.send(error)
      }
    )
    //res.send(accessToken)
  }
}
