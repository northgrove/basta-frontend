import React from 'react'
import PropTypes from 'prop-types'
import {OrderCheckBox, OrderNumberBox, OrderTextBox} from './formComponents'

const OrderForm = (props) => {
    const {image, title, orderFields, values, onChange} = props
    return (
        <div className='orderForm'>
            <div className='orderFormImage'><img src={image}/></div>
            <div className='orderFormTitle'>{title}</div>
            <div className='orderFormItems'>
                {
                    Object.keys(orderFields).map((orderFieldKey) => {
                        const orderField = orderFields[orderFieldKey]
                        switch(orderField.fieldType){
                            case 'number':
                                return <OrderNumberBox key={orderFieldKey} valid={orderField.valid} label={orderField.label} value={values[orderFieldKey]} min={orderField.min} max={orderField.max} description={orderField.description}
                                                       onChange={(v) => onChange(orderFieldKey, v)}/>
                            case 'text':
                                return <OrderTextBox key={orderFieldKey} label={orderField.label} value={values[orderFieldKey]}
                                                     onChange={(v) => onChange(orderFieldKey, v)}/>
                            case 'checkBox':
                                return <OrderCheckBox key={orderFieldKey} label={orderField.label} value={values[orderFieldKey]}
                                                      description={orderField.description}
                                                      onChange={(v) => onChange(orderFieldKey, v)}/>

                            default: null
                        }
                    })
                }
            </div>
        </div>
    )
}
OrderForm.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    orderTypes: PropTypes.object,
    values: PropTypes.object,
    onChange: PropTypes.func

}
export default OrderForm