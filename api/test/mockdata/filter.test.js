const orders = require('./orders.json')

test('Filters', () => {
  const desc = orders.map(order => {
    return order.orderDescription
  })
  const unique = [...new Set(desc)]
  console.log(unique)
  expect(orders).length.toBe(11)
})
