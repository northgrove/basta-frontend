import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {OrderCheckBox, OrderNumberBox, OrderTextBox, OrderButtonGroup} from './formComponents'
import orderTypes from '../../../configuration/'

export class OrderForm extends Component {
    constructor(props) {
        super(props)
        this.currentComponent = props.match.params.orderType
        this.configuration = orderTypes[this.currentComponent]
        this.orderFields = this.configuration.orderFields

        for (const key in this.orderFields) {
            this.orderFields[key].valid = true
            this.state = {...this.state, [key]: this.orderFields[key].default}
        }
    }

    handleChange(field, value) {
        console.log(field, value)
        const orderField = this.orderFields[field]
        if (value < orderField.min || value > orderField.max) {
            orderField.valid = false
        } else {
            orderField.valid = true
        }
        this.orderFields[field].value = value
        this.setState({[field]: value})
    }

    validOrder() {
        for (const key in this.orderFields) {
            if (!this.orderFields[key].valid) return false
        }
        return true
    }

    render() {

        const orderFields = this.orderFields
        return (
            <div>
                <div className='orderForm'>
                    <div className='orderFormImage'><img src={this.configuration.image}/></div>
                    <div className='orderFormHeading'>
                        <div className='orderFormTitle'>{this.configuration.title}</div>
                        <div className='orderFormDescription'>{this.configuration.description}</div>
                    </div>
                    <div className='orderFormItems'>
                        {
                            Object.keys(orderFields).map((orderFieldKey) => {
                                const orderField = orderFields[orderFieldKey]
                                switch (orderField.fieldType) {
                                    case 'number':
                                        return <OrderNumberBox key={orderFieldKey} valid={orderField.valid}
                                                               label={orderField.label}
                                                               value={this.state[orderFieldKey]}
                                                               min={orderField.min}
                                                               max={orderField.max}
                                                               description={orderField.description}
                                                               onChange={(v) => this.handleChange(orderFieldKey, v)}/>
                                    case 'text':
                                        return <OrderTextBox key={orderFieldKey} label={orderField.label}
                                                             value={this.state[orderFieldKey]}
                                                             onChange={(v) => this.handleChange(orderFieldKey, v)}/>
                                    case 'checkBox':
                                        return <OrderCheckBox key={orderFieldKey} label={orderField.label}
                                                              value={this.state[orderFieldKey]}
                                                              description={orderField.description}
                                                              onChange={(v) => this.handleChange(orderFieldKey, v)}/>
                                    case 'buttonGroup':
                                        return <OrderButtonGroup key={orderFieldKey} label={orderField.label}
                                                              value={this.state[orderFieldKey]}
                                                              description={orderField.description}
                                                              alternatives={orderField.alternatives}
                                                              onChange={(v) => this.handleChange(orderFieldKey, v)}/>

                                    default:
                                        console.log('fieldType', orderField.fieldType, 'is not a valid OrderForm component')
                                }
                            })
                        }
                    </div>
                    <div
                        className={this.validOrder() ? 'orderFormSubmitButton' : 'orderFormSubmitButton disabled'}>Submit
                    </div>
                </div>
            </div>
        )
    }
}

OrderForm.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    orderFields: PropTypes.object,
    onSubmit: PropTypes.func

}
export default OrderForm