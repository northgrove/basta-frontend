import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const OrderCard = (props) => {
    const {label, description, image, url} = props
    return (
        <Link to={url} className='orderCard'>
            <div className='orderCardGrid'>
                <div className='orderImage'><img src={image} /></div>
                <div className='orderLabel'>{label}</div>
                <div className='orderDescription'>{description}</div>
            </div>
        </Link>
    )
}

OrderCard.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.array,
    url: PropTypes.string
}

export default OrderCard