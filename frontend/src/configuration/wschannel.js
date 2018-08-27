const description = 'Channel'
const title = 'MQ'
const image = require('../img/orderTypes/websphere.png')
const orderFields = {
    environment: {
        label: 'Environment',
        description: '',
        fieldType: 'buttonGroup',
        alternatives: [{label:'development', value:'utvikling'}, {label:'test', value:'test'}, {label:'PreProd', value:'preprod'}, {label:'Production', value:'prod'}],
        default: 'utvikling'
    },
    encrypted: {
        label: 'TLS',
        description: 'Adds encryption with TLS_RSA_AES_256_CBC_SHA',
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