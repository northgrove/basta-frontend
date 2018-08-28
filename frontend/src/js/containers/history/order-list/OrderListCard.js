import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const OrderCard = props => {
  const { order } = props
  // console.log(order)
  if (!order) return null
  return (
    <div className="orderListCard">
      <div className="orderListCardName"> name </div>
      <div className="orderListCardOperation"> operation</div>
      <div className="orderListCardResults"> {orderResults(order.results)}</div>
      <div className="orderListCardStatus"> status </div>
      <div className="orderListCardCreated"> created </div>
    </div>
  )
}

const orderId = id => {
  return `#${id}`
}

const orderStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return (
        <div>
          {/* <i           className="fa fa-check-circle fa-2x"style={{ color: '#3cc132', fontSize: '15px', marginRight: '2px' }}/> */}
          Success
        </div>
      )
    case 'ERROR':
      return (
        <div>
          {/* <i className="fa fa-exclamation-triangle" style={{ color: '#f44242', fontSize: '18px' }}/> */}
          Error
        </div>
      )
    case 'WARNING':
      return (
        <div>
          {/* <i className="fa fa-info-circle" style={{ color: '#f4f141', fontSize: '18px' }} /> */}
          Warning
        </div>
      )
    // TODO processcing and waiting status cases
  }
}

const orderOperation = order => {
  return `${order.orderOperation} | ${order.orderType} | ${order.orderDescription}`
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

const orderCreatedBy = (createdByDisplayName, createdBy) => {
  return `${createdByDisplayName} (${createdBy})`
}

const orderCreated = created => {
  const time = moment(created).format('Do Mo YYYY h:mm:ss')
  return time
}

OrderCard.propTypes = {
  order: PropTypes.object
}

export default OrderCard
