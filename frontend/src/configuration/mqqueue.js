const description = 'MQ queue operations'
const title = 'Start, stop or delete'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
  class: {
    label: 'Env. class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'utvikling' },
      { label: 'test', value: 'test' },
      { label: 'PreProd', value: 'preprod' },
      { label: 'Production', value: 'prod' }
    ],
    value: 'utvikling'
  },
  manager: {
    label: 'Queue Manager',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  name: {
    label: 'Queue name',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
