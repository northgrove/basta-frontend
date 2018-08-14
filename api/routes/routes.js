const express = require('express')
const router = express.Router()
const auth = require('../controllers/authenticate')
const { api } = require('../config/config')


// Authentication

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

router.get

module.exports = router