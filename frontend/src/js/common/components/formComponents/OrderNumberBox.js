import React from 'react'
import PropTypes from 'prop-types'

const OrderNumberBox = (props) => {
    const {label, value, min, max, description, onChange} = props
    return (
        <div className='formComponentGrid'>
            <div className='formComponentLabel'>{label}</div>
            <div className='formComponentField'>
                <input className='formComponentTextField' maxLength='1' type='tel' name='filter' placeholder={value}
                       onChange={(e) => onChange(parseInt(e.target.value))}/>
                <div className='formComponentDescription'>{description}</div>
            </div>
        </div>
    )
}

OrderNumberBox.propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func
}

export default OrderNumberBox