if (process.env['NODE_ENV'] === 'production') {
  ;(exports.identityMetadata =
    'https://login.microsoftonline.com/navq.onmicrosoft.com/.well-known/openid-configuration'),
    (exports.clientID = 'b36e92f3-d48b-473d-8f69-e7887457bd3f'),
    (exports.clientSecret = 'T5VGx+iaAjPHS/Vi/c5VN6jQH2kCfR2PUqVA+B4GSdk='),
    (exports.responseType = 'code id_token'),
    (exports.responseMode = 'form_post'),
    (exports.redirectUrl = 'http://localhost:8080/auth/openid/callback'),
    (exports.passReqToCallback = true),
    (exports.scope = 'profile offline_access'),
    (exports.allowHttpForRedirectUrl = false),
    (exports.validateIssuer = true),
    (exports.loggingLevel = 'error')
} else if (process.env['NODE_ENV'] === 'development') {
  ;(exports.identityMetadata =
    'https://login.microsoftonline.com/navq.onmicrosoft.com/.well-known/openid-configuration'),
    (exports.clientID = 'b36e92f3-d48b-473d-8f69-e7887457bd3f'),
    (exports.clientSecret = 'T5VGx+iaAjPHS/Vi/c5VN6jQH2kCfR2PUqVA+B4GSdk='),
    (exports.responseType = 'code id_token'),
    (exports.responseMode = 'form_post'),
    (exports.redirectUrl = 'http://localhost:8080/auth/openid/callback'),
    (exports.passReqToCallback = true),
    (exports.scope = 'profile offline_access'),
    (exports.allowHttpForRedirectUrl = true),
    (exports.validateIssuer = true),
    (exports.loggingLevel = 'info')
}
