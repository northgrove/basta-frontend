import React from 'react'
import PropTypes from 'prop-types'
import Slider from '@material-ui/lab/Slider'

const OrderSlider = (props) => {
    const {label, value, min, max, step, onChange} = props
    return (
        <div className='orderFormItemsGrid'>
            <div className='orderItemLabel'>{label}</div>
            <div className='orderItemOptions'>
                <Slider value={value} min={min} max={max} step={step} onChange={onChange}>Ahoy</Slider>
            </div>
        </div>
    )
}

OrderSlider.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    onChange: PropTypes.func
}

export default OrderSlider