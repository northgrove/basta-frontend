const description = 'Application Server'
const title = 'Jboss'
const image = require('../img/orderTypes/big-ip.png')
const orderFields = {
  environmentClass: {
    label: 'Env. class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p', access: ['ROLE_PROD'] }
    ],
    value: 'u'
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
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  },
  applicationMappingName: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  //TODO: Fetch from backend
  manager: {
    label: 'Virtual server',
    description: '',
    fieldType: 'dropDown',
    alternatives: ['a', 'b', 'c', 'd', 'e'],
    value: ''
  },
  matchingType: {
    label: 'Matching type',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'Context root', value: 'context' },
      { label: 'Hostname', value: 'hostname' }
    ],
    value: 'context'
  },
  roots: {
    label: 'Context root(s)',
    description: 'Add context roots',
    fieldType: 'text',
    value: ''
  },
  hostname: {
    label: 'VS hostname / DNS',
    description: 'Hostname of the virutal server',
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
