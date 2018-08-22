import React from 'react'
import PropTypes from 'prop-types'

const OrderCard = (props) => {
    const { order } = props
    console.log(order)
    if (!order) return null
    return (
        <div className='orderListCard'>
            <div className='orderListCardId'>
                {orderId(order.id)}
            </div>
            <div className='orderListCardStatus'>
                {orderStatus(order.status)}
            </div>
            <div className='orderListCardOperation'>
                {orderOperation(order)}
            </div>
            <div className='orderListCardResult'>
                {orderResults(order.results)}
            </div>
            <div className='orderListCardCreated'>
                Created
            </div>
            <div className='orderListCardTime'>
                Time
            </div>
        </div>
    )
}

const orderId = (id) => {
    return `# ${id}`
}

const orderStatus = (status) => {
    switch (status) {
        case 'SUCCESS':
            return (
                <div>
                    <i className='fa fa-check-circle fa-2x' style={{ color: '#3cc132', fontSize: '15px', marginRight: '2px' }}> </i>
                    Success
                </div>
            )
        case 'ERROR':
            return (
                < div >
                    <i className='fa fa-exclamation-triangle' style={{ color: '#f44242', fontSize: '18px' }}> </i>
                    Error
                </div >
            )
        case 'WARNING':
            return (
                < div >
                    <i className='fa fa-info-circle' style={{ color: '#f4f141', fontSize: '18px' }}> </i>
                    Warning
                </div >
            )
        // TODO processcing and waiting status cases
    }
}

const orderResults = (results) => {
    return results.map((e, i) => {
        return (
            <div key={i}>
                {e} <br /> 
            </div>
        )
    })
}

const orderOperation = (order) => {
    return `${order.orderOperation} | ${order.orderType} | ${order.orderDescription}`
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard