if (process.env['NODE_ENV'] === 'production') {
    exports.api = process.env['API_VERSION']
    exports.host = process.env['HOST'] 
    exports.mongoDb = process.env['MONGODB_URI'] 
    exports.port = process.env['PORT'] 
    exports.sessionSecret = process.env['SESSION_SECRET']
}
else if (process.env['NODE_ENV'] === 'development') {
    exports.api = '/api/v1'
    exports.host = 'localhost'
    exports.mongoDb = 'mongodb://localhost/basta'
    exports.port = 8080
    exports.sessionSecret = 'H3mligereEnnDetteBlirDetIkke!'
}
