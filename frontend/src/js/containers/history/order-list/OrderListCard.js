import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../../../common/components/formComponents/OrderStatusBadge'

const image = require('../../../../img/orderTypes/websphere.png')

const OrderCard = props => {
  const { order } = props
  if (!order) return null
  return (
    <Link to={`/orders/${order.id}`}>
      <div className="orderListCard">
        <div className={orderListCardStatus(order.status)} />
        <div className="orderImage orderListImage">
          <img src={image} />
        </div>
        <div className="orderListCardName">
          <div>{orderType(order.orderOperation, order.orderType, order.orderDescription)}</div>
          <i>{order.createdByDisplayName + ` (${order.createdBy})`}</i>
        </div>
        <div className="orderListCardResults"> {orderResults(order.results)}</div>
        <div className="orderListCardCreated">{order.created}</div>
      </div>
    </Link>
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

const orderCreatedBy = (created, createdByDisplayName, createdBy) => {
  return `${created} | ${createdByDisplayName} (${createdBy})`
}

const orderListCardStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return 'orderListCardStatus success'
    case 'WARNING':
      return 'orderListCardStatus warning'
    case 'PROCESSING':
      return 'orderListCardStatus processing'
    case 'ERROR':
      return 'orderListCardStatus error'
  }
  return <span> {status}</span>
}

OrderCard.propTypes = {
  order: PropTypes.object
}

export default OrderCard
