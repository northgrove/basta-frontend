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
import { withRouter } from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
const mqImage = require('../../../img/orderTypes/mq.png')

export class MqQueue extends Component {
  constructor(props) {
    super(props)
  }

  handleChange(field, value) {
    const orderField = this.orderFields[field]
    if (value < orderField.min || value > orderField.max) {
      orderField.valid = false
    } else {
      orderField.valid = true
    }
    this.orderFields[field].value = value
    this.setState({ [field]: value })
  }

  validOrder() {
    for (const key in this.orderFields) {
      if (!this.orderFields[key].valid) return false
    }
    return true
  }

  render() {
    const orderFields = this.orderFields
    const { dispatch } = this.props
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
          <div className="orderFormItems" />
          <div className="orderFormSubmitButton">Submit</div>
        </div>
      </div>
    )
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

export default withRouter(connect(mapStateToProps)(MqQueue))
