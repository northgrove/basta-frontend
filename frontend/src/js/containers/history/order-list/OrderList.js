import React from 'react'
import PropTypes from 'prop-types'
import OrderListCard from './OrderListCard'
import Spinner from '../../../common/components/Spinner'

const OrderList = props => {
  const { orderHistory } = props
  console.log(orderHistory)
  if (orderHistory.length === 0) return <Spinner />
  return <div className="orderListContainer">{renderList(orderHistory)}</div>
}

const renderList = orders => {
  let orderList = []
  if (orders.length >= 1) {
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
