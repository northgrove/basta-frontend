import React from 'react'
import PropTypes from 'prop-types'
import OrderListCard from './OrderListCard'

const OrderList = props => {
  const { orderHistory } = props
  return <div className="orderListContainer">{renderList(orderHistory)}</div>
}

const renderList = orders => {
  let orderList = []

  if (orders.length >= 1000) {
    // console.log('1000')

    orders.forEach((e, i) => {
      orderList.push(
        <div key={i}>
          <OrderListCard order={e} />
        </div>
      )
    })
  } else {
    // console.log('do nothing')
  }
  return orderList
}

OrderList.propTypes = {
  orderHistory: PropTypes.array
}

export default OrderList
