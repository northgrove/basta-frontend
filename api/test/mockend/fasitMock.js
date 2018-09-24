const applications = require('../mockdata/applications.json')
const environments = require('../mockdata/environments.json')

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
