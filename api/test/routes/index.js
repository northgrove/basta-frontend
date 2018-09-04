const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const order = require('../controllers/order')
const health = require('../controllers/health')
const { api } = require('../config')

// APPLICATION HEALTH

router.get('/isalive', health.isAlive())

router.get('/selftest', health.selftest())

router.get('/metrics', health.metrics())

// USER

router.get(`${api}/user/profile`, user.getUserProfile())

router.get(`${api}/user/session`, user.userSessionLookup())

// ORDERS

router.get(`${api}/orders/page/:pageId/:pageSize/:toDate/:fromDate`, order.getOrders())

router.get(`${api}/orders/:id/`, order.getOrder())

router.post(`${api}/orders/:type/`, order.postOrder())

// STATUSLOG

router.get(`${api}/orders/:id/statuslog`, order.getStatusLog())

module.exports = router
