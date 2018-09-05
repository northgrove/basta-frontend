const description = 'Node'
const title = 'Websphere Application Server'
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
  zone: {
    label: 'Zone',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Fagsystemsone', value: 'fss' },
      { label: 'Selvbetjeningssone', value: 'sbs' }
    ],
    value: 'fss'
  },
  env: {
    label: 'Environment',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  application: {
    label: 'Application',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  servers: {
    label: 'Servers',
    description: 'Virtual Servers',
    fieldType: 'number',
    min: 1,
    max: 8,
    value: 1
  },
  cpu: {
    label: 'Cpu',
    description: 'Virtual sockets',
    fieldType: 'number',
    min: 1,
    max: 4,
    value: 1
  },
  memory: {
    label: 'Memory',
    description: 'GB',
    fieldType: 'number',
    min: 2,
    max: 32,
    value: 2
  },
  disk: {
    label: 'Extra disk',
    description: 'GB',
    fieldType: 'number',
    min: 0,
    max: 100,
    value: 0
  },
  description: {
    label: 'Description',
    description: 'What is this server used for?',
    fieldType: 'text',
    value: ''
  },
  custom: {
    label: 'Custom',
    description: 'Classify this server as custom',
    fieldType: 'checkBox',
    value: false
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
