import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../../../common/components/formComponents/OrderStatusBadge'

const OrderCard = props => {
  const { order } = props
  // console.log(order)
  if (!order) return null
  return (
    <Link to={`/orders/${order.id}`}>
      <div className="orderListCard">
        <div className="orderListCardName">
          {orderType(order.orderOperation, order.orderType, order.orderDescription)}
        </div>
        {/* <div className="orderListCardOperation"> </div> */}
        <div className="orderListCardResults"> {orderResults(order.results)}</div>
        <div className={orderListCardStatus(order.status)}>{orderStatus(order.status)}</div>
        <div className="orderListCardCreated">
          {orderCreatedBy(order.created, order.createdByDisplayName, order.createdBy)}{' '}
        </div>
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

const orderStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return <i className="fa fa-check" />
    case 'WARNING':
      return <i className="fa fa-flag" />
    case 'PROCESSING':
      return <i className="fa fa-recycle" />
    case 'ERROR':
      return <i className="fa fa-exclamation-triangle" />
  }
  return <span />
}

export default OrderCard
