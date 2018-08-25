import React from 'react'
import PropTypes from 'prop-types'
const OrderDropDown = (props) => {
    const {label, options} = props
    return (
        <div>
            <div className='orderItemLabel'>{label}</div>
            <div className='orderItemOptions'>
            </div>
        </div>
    )
}

OrderDropDown.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array
}

export default OrderDropDown