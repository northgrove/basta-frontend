if (process.env['NODE_ENV'] === 'production') {
    exports.api = process.env['API_VERSION'] || '/api/v1'
    exports.host = process.env['HOST'] || 'localhost'
    exports.mongoDb = process.env['MONGODB_URI'] || 'mongodb://localhost/basta'
    exports.port = process.env['PORT'] || '8080'
    exports.sessionSecret = process.env['SESSION_SECRET'] || 'H3mligereEnnDetteBlirDetIkke!'
}
else if (process.env['NODE_ENV'] === 'development') {
    exports.api = '/api/v1'
    exports.host = 'localhost'
    exports.mongoDb = 'mongodb://localhost/basta'
    exports.port = 8080
    exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
}