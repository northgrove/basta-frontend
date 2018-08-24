import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {OrderCheckBox, OrderNumberBox, OrderTextBox} from './formComponents'

export class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.orderFields = this.props.orderFields

        for (const key in this.orderFields) {
            this.orderFields[key].valid = true
            this.state = {...this.state, [key]: this.orderFields[key].default}
        }
    }
    handleChange(field, value) {
        const orderField = this.orderFields[field]
        if (value < orderField.min || value > orderField.max) {
            orderField.valid = false
        } else {
            orderField.valid = true
        }
        this.orderFields[field].value = value
        this.setState({[field]: value})
    }
    validOrder(){
        for (const key in this.orderFields) {
            if (!this.orderFields[key].valid) return false
        }
        return true
    }
    render() {

        const {image, title} = this.props
        const orderFields = this.orderFields
        console.log(this.validOrder())
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
                                    return <OrderNumberBox key={orderFieldKey} valid={orderField.valid} label={orderField.label} value={this.state[orderFieldKey]} min={orderField.min} max={orderField.max} description={orderField.description}
                                                           onChange={(v) => this.handleChange(orderFieldKey, v)}/>
                                case 'text':
                                    return <OrderTextBox key={orderFieldKey} label={orderField.label} value={this.state[orderFieldKey]}
                                                         onChange={(v) => this.handleChange(orderFieldKey, v)}/>
                                case 'checkBox':
                                    return <OrderCheckBox key={orderFieldKey} label={orderField.label} value={this.state[orderFieldKey]}
                                                          description={orderField.description}
                                                          onChange={(v) => this.handleChange(orderFieldKey, v)}/>

                                default: null
                            }
                        })
                    }
                </div>
                <div className={this.validOrder() ? 'orderFormSubmitButton' : 'orderFormSubmitButton disabled'}>Submit</div>
            </div>
        )
    }
}
OrderForm.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    orderFields: PropTypes.object,

}
export default OrderForm