import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderNumberBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  ApplicationsDropDown
} from '../../common/components/formComponents'
import connect from 'react-redux/es/connect/connect'
const mqImage = require('../../../img/orderTypes/mq.png')

export class MqQueue extends Component {
  constructor(props) {
    super(props)
    for (const key in orderFields) {
      orderFields[key].valid = true
      this.state = { ...this.state, [key]: orderFields[key].value }
    }
  }

  handleChange(field, value) {
    const orderField = orderFields[field]
    if (value < orderField.min || value > orderField.max) {
      orderField.valid = false
    } else {
      orderField.valid = true
    }
    orderFields[field].value = value
    this.setState({ [field]: value })
  }

  validOrder() {
    for (const key in orderFields) {
      if (!orderFields[key].valid) return false
    }
    return true
  }

  render() {
    const { user } = this.props
    console.log(this.state)
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ</div>
            <div className="orderFormDescription">Queue</div>
          </div>
          <div className="orderFormItems">
            <OrderButtonGroup
              label={orderFields.environmentClass.label}
              value={this.state['environmentClass']}
              roles={user.userProfile.roles}
              description={orderFields.environmentClass.description}
              alternatives={orderFields.environmentClass.alternatives}
              onChange={v => this.handleChange('environmentClass', v)}
            />
            <EnvironmentsDropDown
              key={'environmentName'}
              label={orderFields.environmentName.label}
              onChange={v => this.handleChange('environmentName', v)}
              environmentClass={this.state.environmentClass}
              value={this.state['environmentName']}
            />
            <ApplicationsDropDown
              key={'applicationMappingName'}
              label={orderFields.applicationMappingName.label}
              onChange={v => this.handleChange('applicationMappingName', v)}
              value={this.state['applicationMappingName']}
            />
            <OrderTextBox
              key={'name'}
              label={orderFields.name.label}
              value={this.state[name]}
              placeholder={orderFields.name.description}
              onChange={v => this.handleChange(name, v)}
            />
          </div>
          <div className="orderFormSubmitButton">Submit</div>
        </div>
      </div>
    )
  }
}
const orderFields = {
  environmentClass: {
    label: 'Env. class',
    description: '',
    fieldType: 'buttonGroup',
    alternatives: [
      { label: 'development', value: 'u' },
      { label: 'test', value: 't' },
      { label: 'PreProd', value: 'q' },
      { label: 'Production', value: 'p' }
    ],
    value: 'u'
  },
  environmentName: {
    label: 'Environment',
    description: '',
    fieldType: 'environments',
    value: ''
  },
  applicationMappingName: {
    label: 'Application',
    description: '',
    fieldType: 'applications',
    value: ''
  },
  name: {
    label: 'Queue name',
    fieldType: 'text',
    description: 'Name of queue',
    value: ''
  }
}
MqQueue.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  orderFields: PropTypes.object,
  onSubmit: PropTypes.func,
  dispatch: PropTypes.func
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(MqQueue)
