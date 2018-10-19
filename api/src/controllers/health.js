const logger = require('morgan')

exports.isAlive = () => {
  console.log('calling isalive')

  return (req, res) => {
    console.log('calling isalive before 200')
    res.status(200).end()
  }
}

exports.selftest = () => {
  return (req, res) => {
    // TODO
    res.status(200).send('Ok!')
  }
}

exports.metrics = () => {
  return (req, res) => {
    res.set('Content-Type', prometheus.register.contentType)
    res.end(prometheus.register.metrics())
  }
}
