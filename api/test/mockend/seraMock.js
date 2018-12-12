const servers = require('../mockdata/seraMockData.json')

const findVmInfo = hostname => {
  console.log(hostname)
  return servers.filter(e => {
    return hostname.includes(e.hostname)
  })
}

exports.getVmInfo = () => {
  return (req, res) => {
    res.status(200).send(findVmInfo(req.query.hostname))
  }
}
