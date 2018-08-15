const orderData = require('../mock/orders.json')


const paginate = (pageId, pageSize, data) => {
    if (pageSize > 200) throw ('Page size out of bounds (200 Max value)')
    const startIndex = pageId * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
}

exports.getOrders = () => {
    return async (req, res) => {
        let requestedData
        try {
            requestedData = await paginate(parseInt(req.params.pageId), parseInt(req.params.pageSize), orderData)
        } catch (err) {
            console.log(err)
            res.status(500).send(err)
            return null
        }
        res.status(200).send(requestedData)
    }
}
