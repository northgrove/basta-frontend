if (process.env['NODE_ENV'] === 'production') {
  exports.api = process.env['API_VERSION'] || '/api/v1'
  exports.host = process.env['HOST'] || 'localhost'
  exports.mongoDb = process.env['MONGODB_URL'] || 'mongodb://localhost:27017/basta'
  exports.port = process.env['PORT'] || '8080'
  exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
} else if (process.env['NODE_ENV'] === 'development' || process.env['NODE_ENV'] === 'offline') {
  exports.api = '/api/v1'
  exports.host = 'localhost'
  exports.mongoDb = 'mongodb://localhost:27017/basta'
  exports.port = 8080
  exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
}
