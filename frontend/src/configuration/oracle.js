// TODO: Have to add functionality to fetch databasename and fasitalias, as well as a field to retrieve databasetype from OEM
const title = 'Database'
const description = 'Oracle'
const image = require('../img/orderTypes/oracle.png')
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
  databasename: {
    label: 'Database name',
    fieldType: 'text',
    description: 'fetching from OEM...',
    value: ''
  },
  databasetype: {
    label: 'Database type',
    fieldType: 'text',
    description: 'fetching from OEM...',
    value: ''
  }
}
module.exports = {
  description,
  title,
  image,
  orderFields
}
