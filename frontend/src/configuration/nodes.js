const title = 'VM Operations'
const description = 'Start, stop or delete'
const image = require('../img/orderTypes/redhat.png')
const orderFields = {
  hostnames: {
    label: '',
    description: 'comma separated list of hosts',
    fieldType: 'seraLookup',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
