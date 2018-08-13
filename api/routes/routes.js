const express = require('express')
const router = express.Router()
const { api } = require('../config/config')


// User

router.get(`${api}/even`, (req, res) => {
    res.send('Er kul')
})

module.exports = router