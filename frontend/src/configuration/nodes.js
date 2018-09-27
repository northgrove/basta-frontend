const title = 'VM Operations'
const description = 'Start, stop or delete'
const image = require('../img/orderTypes/redhat.png')
const orderFields = {
  hostnames: {
    label: 'Hostname(s)',
    description: 'comma separated list of hosts',
    fieldType: 'text',
    value: ''
  },
  // TODO: fetch hostnames from Sera
  result: {
    label: 'Search result',
    description: 'Should fetch a list from sera',
    fieldType: 'text',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
