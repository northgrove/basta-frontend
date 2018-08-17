import React from 'react'
import PropTypes from 'prop-types'

const OrderForm = (props) => {
    const {children, image, title} = props
    return (
        <div className='orderForm'>
            <div className='orderFormImage'><img src={image}/></div>
            <div className='orderFormTitle'>{title}</div>
            <div className='orderFormItems'>{children}</div>
        </div>
    )
}
OrderForm.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.array
}
export default OrderForm