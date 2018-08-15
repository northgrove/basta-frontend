import React from 'react'
import PropTypes from 'prop-types'

const OrderCard = (props) => {
    const {label, description, image} = props
    return (
        <div className='orderCard'>
            <div className='orderCardGrid'>
                <div className='orderImage'><img src={image} /></div>
                <div className='orderLabel'>{label}</div>
                <div className='orderDescription'>{description}</div>
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array
}

export default OrderCard