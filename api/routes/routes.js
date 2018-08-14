const express = require('express')
const router = express.Router()
const { api } = require('../config/config')


// User

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

module.exports = router