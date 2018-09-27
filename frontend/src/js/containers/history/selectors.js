export const getOrders = (state, n) => {
  let arr = state.orderHistory.orderHistory
  return arr.slice(0, n)
}

export const getTotalOrders = state => state.orderHistory.totalOrders
