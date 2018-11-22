const description = 'Developer tools available from laptops via VPN'
const title = 'Order new Dev tool iApp server'
const image = require('../img/orderTypes/devtools-iapp.png')
const orderFields = {
  nodeType: {
    value: 'PLAIN_LINUX'
  },
  environmentClass: {
    value: 'p'
  },
  zone: {
    value: 'iapp'
  },
  serverCount: {
    label: 'Servers',
    description: 'Virtual Servers',
    fieldType: 'number',
    min: 1,
    max: 8,
    value: 1
  },
  cpuCount: {
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
  extraDisk: {
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
  ibmSw: {
    label: 'IBM software',
    description: 'Will install ILMT monitoring agent',
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
