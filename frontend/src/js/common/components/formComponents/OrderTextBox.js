import React, {Component} from 'react'

import PropTypes from 'prop-types'

const OrderTextBox = (props) => {
    const {label, value, onChange} = props
        return (
            <div className='formComponentGrid'>
                <div className='formComponentLabel'>{label}</div>
                <div className='formComponentField'>
                    <input className='formComponentTextField' type='text' placeholder='description...'
                           value={value}
                           onChange={(e) => onChange(e.target.value)}/>
                </div>
            </div>
        )
    }
OrderTextBox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default OrderTextBox