const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const orders = require('../controllers/orders')
const { api } = require('../config/config')


// AUTHENTICATION

router.get(`${api}/auth/session`, (req, res) => {
    res.status(200).send({
        userName: 'h141513',
        firstName: 'Even',
        lastName: 'Haasted',
        roles: [
            'MASTER_OF_THE_UNIVERSE',
            'KJIP_KAR'
        ]
    })
})

router.get(`${api}/auth/openid`, auth.authenticateAzure())

router.get(`${api}/auth/openid/callback`, auth.authenticateAzure())

// ORDERS

router.get(`${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`, orders.getOrders())

module.exports = router