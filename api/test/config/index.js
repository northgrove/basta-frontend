if (process.env['NODE_ENV'] === 'production') {
  exports.api = process.env['API_VERSION'] || '/api/v1'
  exports.host = process.env['HOST'] || 'localhost'
  exports.port = process.env['PORT'] || '8080'
  exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
} else if (process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'offline') {
  exports.api = '/api/v1'
  exports.host = 'localhost'
  exports.port = 8080
  exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
}
