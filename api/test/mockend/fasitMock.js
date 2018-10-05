const applications = require('../mockdata/applications.json')
const environments = require('../mockdata/environments.json')
const mq_u = require('../mockdata/mq_u.json')
const mq_t = require('../mockdata/mq_t.json')
const mq_q = require('../mockdata/mq_q.json')
const mq_p = require('../mockdata/mq_p.json')
const bestmatch_u = require('../mockdata/bestmatch_u.json')
const bestmatch_t = require('../mockdata/bestmatch_t.json')
const bestmatch_q = require('../mockdata/bestmatch_q.json')
const bestmatch_p = require('../mockdata/bestmatch_p.json')

exports.getApplications = () => {
  return (req, res) => {
    res.status(200).json(applications)
  }
}

exports.getEnvironments = () => {
  return (req, res) => {
    res.status(200).json(environments)
  }
}

exports.getResources = () => {
  return (req, res) => {
    const bestMatch = req.query.bestmatch
    const envClass = req.query.envClass
    if (bestMatch) {
      switch (envClass) {
        case 'u':
          res.status(200).json(bestmatch_u)
          break
        case 't':
          res.status(200).json(bestmatch_t)
          break
        case 'q':
          res.status(200).json(bestmatch_q)
          break
        case 'p':
          res.status(200).json(bestmatch_p)
          break
      }
    }
    switch (envClass) {
      case 'u':
        res.status(200).json(mq_u)
        break
      case 't':
        res.status(200).json(mq_t)
        break
      case 'q':
        res.status(200).json(mq_q)
        break
      case 'p':
        res.status(200).json(mq_p)
        break
    }
  }
}
