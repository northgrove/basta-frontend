import React from 'react'
import PropTypes from 'prop-types'

const OrderCard = (props) => {
    const { order } = props
    return (
        <div className='orderList'>
            <div className='orderListGrid'>
                OrderCard
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    order: PropTypes.object
}

export default OrderCard