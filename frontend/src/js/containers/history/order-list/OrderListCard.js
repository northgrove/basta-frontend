import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'
import OrderStatusBadge from '../../../common/components/formComponents/OrderStatusBadge'

const wasImage = require('../../../../img/orderTypes/websphere.png')
const jbossImage = require('../../../../img/orderTypes/jboss.png')
const wildflyImage = require('../../../../img/orderTypes/wildfly.png')
const libertyImage = require('../../../../img/orderTypes/liberty.png')
const securityImage = require('../../../../img/orderTypes/security.png')
const openamImage = require('../../../../img/orderTypes/openam.png')
const redhatImage = require('../../../../img/orderTypes/redhat.png')
const containerlinuxImage = require('../../../../img/orderTypes/containerlinux.png')
const dbImage = require('../../../../img/orderTypes/oracle.png')
const windowsImage = require('../../../../img/orderTypes/windows.png')
const bigipImage = require('../../../../img/orderTypes/big-ip.png')
const mqImage = require('../../../../img/orderTypes/mq.png')
const developertoolsImage = require('../../../../img/orderTypes/devtools.png')
const iappImage = require('../../../../img/orderTypes/devtools-iapp.png')
const coreosImage = require('../../../../img/orderTypes/containerlinux.png')
const unknown = require('../../../../img/orderTypes/unknown.png')

function imageType(orderDescription) {
  console.log(orderDescription)
  switch (orderDescription.toLowerCase()) {
    case 'was deployment manager':
      return wasImage
    case 'was nodes':
      return wasImage
    case 'was9 nodes':
      return wasImage
    case 'big-ip':
      return bigipImage
    case 'wildfly':
      return wildflyImage
    case 'jboss':
      return jbossImage
    case 'oracle':
      return dbImage
    case 'plain linux':
      return redhatImage
    case 'certificate':
      return securityImage
    case 'dev tools':
      return developertoolsImage
    case 'dockerhost':
      return developertoolsImage
    case 'windows internet server':
      return windowsImage
    case 'windows applicationserver':
      return windowsImage
    case 'topic':
      return mqImage
    case 'queue':
      return mqImage
    case 'channel':
      return mqImage
    case 'credential':
      return securityImage
    case 'lightweight linux':
      return containerlinuxImage
    default:
      return unknown
  }
  return wasImage
}

const OrderCard = props => {
  const { order } = props
  if (!order) return null
  const image = imageType(order.orderDescription)
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
