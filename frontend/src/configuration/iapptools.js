const description = 'Developer tools available from laptops via VPN'
const title = 'Create new Dev tool iApp server'
const image = require('../img/orderTypes/devtools-iapp.png')
const orderFields = {
    servers: {
        label: 'Servers',
        description: 'Virtual Servers',
        fieldType: 'number',
        min: 1,
        max: 8,
        default: 1
    },
    cpu: {
        label: 'Cpu',
        description: 'Virtual sockets',
        fieldType: 'number',
        min: 1,
        max: 4,
        default: 1
    },
    memory: {
        label: 'Memory',
        description: 'GB',
        fieldType: 'number',
        min: 2,
        max: 32,
        default: 2
    },
    disk: {
        label: 'Extra disk',
        description: 'GB',
        fieldType: 'number',
        min: 0,
        max: 100,
        default: 0
    },
    description: {
        label: 'Description',
        description: 'What is this server used for?',
        fieldType: 'text',
        default: ''
    },
    ibm: {
        label: 'IBM software',
        description: 'Will install ILMT monitoring agent',
        fieldType: 'checkBox',
        default: false
    }
}
module.exports = {
    description,
    title,
    image,
    orderFields
}