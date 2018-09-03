const orders = require('../../test/mockdata/orders.json')
const order = require('../../test/mockdata/order.json')
const statusLog = require('../../test/mockdata/statuslog.json')
const orderCreated = require('../../test/mockdata/orderCreated.json')

const paginate = (pageId, pageSize, data) => {
  if (pageSize > 200) throw 'Page size out of bounds (200 Max value)'
  const startIndex = pageId * pageSize
  const endIndex = startIndex + pageSize
  return data.slice(startIndex, endIndex)
}

exports.getOrders = () => {
  return async (req, res) => {
    let requestedData
    try {
      requestedData = await paginate(
        parseInt(req.params.pageId),
        parseInt(req.params.pageSize),
        orders
      )
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
      return null
    }
    res.status(200).json(requestedData)
  }
}

exports.getOrder = () => {
  return (req, res) => {
    try {
      res.status(200).json(order)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

exports.getStatusLog = () => {
  return (req, res) => {
    try {
      res.status(200).json(statusLog)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}

exports.postOrder = () => {
  return (req, res) => {
    try {
      res.status(200).json(orderCreated)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
}
