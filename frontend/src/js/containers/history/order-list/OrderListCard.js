import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import OrderStatusBadge from '../../../common/components/formComponents/OrderStatusBadge'

const OrderCard = props => {
  const { order } = props
  // console.log(order)
  if (!order) return null
  return (
    <div className="orderListCard">
      <div className="orderListCardName">
        {orderType(order.orderOperation, order.orderType, order.orderDescription)}
      </div>
      <div className="orderListCardOperation"> </div>
      <div className="orderListCardResults"> {orderResults(order.results)}</div>
      <div className="orderListCardStatus">
        <OrderStatusBadge status={order.status} />
      </div>
      <div className="orderListCardCreated"> created </div>
    </div>
  )
}

const orderType = (orderOperation, orderType, orderDescription) => {
  return `${orderOperation} | ${orderType} | ${orderDescription}`
}

const orderResults = results => {
  return results.map((e, i) => {
    return (
      <div key={i}>
        {e} <br />
      </div>
    )
  })
}

const orderCreatedBy = (created, createdBy) => {}

OrderCard.propTypes = {
  order: PropTypes.object
}

export default OrderCard
