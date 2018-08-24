import React from 'react'

import PropTypes from 'prop-types'

const OrderCheckBox = (props) => {
    const {label, value, onChange} = props
        return (
            <div className='formComponentGrid'>
                <div className='formComponentLabel'>{label}</div>
                <div className='formComponentField'>
                    <div className='formComponentCheckBoxContainer'>
                    <input type='checkbox' checked={value}/>
                        <span className='formComponentCheckBox' onClick={() => onChange(!value)}/>
                    </div>
                </div>
            </div>
        )
    }
OrderCheckBox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func
}

export default OrderCheckBox