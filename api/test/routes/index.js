const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const order = require('../controllers/order')
const { api } = require('../config')

// USER

router.get(`${api}/user/profile`, user.getUserProfile())

router.get(`${api}/user/session`, user.userSessionLookup())

// ORDERS

router.get(`${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`, order.getOrders())

router.get(`${api}/orders/:id/`, order.getOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, order.getStatusLog())

// CREATE
router.post(`${api}/create/:type/`, (req, res) => {
  res.json({ orderId: 4590 })
})

module.exports = router
