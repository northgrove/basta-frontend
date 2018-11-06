import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  OrderCheckBox,
  OrderNumberBox,
  OrderTextBox,
  OrderButtonGroup,
  EnvironmentsDropDown,
  QueueManagerDropDown,
  MqClusterCheckBox,
  ApplicationsDropDown
} from '../../common/components/formComponents'
import connect from 'react-redux/es/connect/connect'
import OrderDropDown from '../../common/components/formComponents/OrderDropDown'
import { fetchMqClusters } from '../../common/actionCreators'

const mqImage = require('../../../img/orderTypes/mq.png')

export class MqChannel extends Component {
  constructor(props) {
    super(props)
    for (const key in orderFields) {
      orderFields[key].valid = true
      this.state = { ...this.state, [key]: orderFields[key].value }
    }
  }

  componentDidUpdate(prevProps, prevState, ss) {
    const {
      environmentClass,
      environmentName,
      name,
      channelName,
      applicationMappingName,
      queueManager
    } = this.state
    const { dispatch } = this.props
    if (prevState.environmentClass != environmentClass) {
      this.setState({
        environmentName: '',
        applicationMappingName: '',
        queueManager: '',
        channelName: '',
        alias: ''
      })
    }
    if (prevState.environmentName != environmentName) {
      this.setState({ applicationMappingName: '', queueManager: '' })
    }
    if (
      prevState.channelName != channelName ||
      prevState.applicationMappingName != applicationMappingName
    ) {
      this.setState({
        channelName: `${environmentName.toUpperCase()}_${applicationMappingName.toUpperCase()}`,
        alias: `${applicationMappingName}_channel`
      })
    }
  }

  handleChange(field, value) {
    const orderField = orderFields[field]
    if ((orderField.min && value < orderField.min) || value > orderField.max) {
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
    const { name, environmentName, applicationMappingName } = this.state
    return (
      <div>
        <div className="orderForm">
          <div className="orderFormImage">
            <img src={mqImage} />
          </div>
          <div className="orderFormHeading">
            <div className="orderFormTitle">WebSphere MQ</div>
            <div className="orderFormDescription">Channel</div>
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
              value={this.state.applicationMappingName}
            />
            {environmentName && applicationMappingName ? (
              <div className={'subcomponents'}>
                <QueueManagerDropDown
                  key={'queueManager'}
                  label={orderFields.queueManager.label}
                  onChange={v => this.handleChange('queueManager', v)}
                  envClass={this.state.environmentClass}
                  envName={this.state.environmentName}
                  application={this.state.applicationMappingName}
                  value={this.state['queueManager']}
                />
                <OrderTextBox
                  key={'channelName'}
                  label={orderFields.channelName.label}
                  value={this.state['channelName']}
                  placeholder={orderFields.channelName.description}
                  onChange={v => this.handleChange('channelName', v)}
                />
                <OrderTextBox
                  key={'alias'}
                  label={orderFields.alias.label}
                  value={this.state['alias']}
                  onChange={v => this.handleChange('alias', v)}
                />
                <OrderCheckBox
                  key={'encrypted'}
                  label={orderFields.encrypted.label}
                  value={this.state['encrypted']}
                  description={orderFields.encrypted.description}
                  onChange={v => this.handleChange('encrypted', v)}
                />
              </div>
            ) : null}
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
    description: 'Name of queue',
    value: ''
  },
  queueManager: {
    label: 'Queue manager',
    value: ''
  },
  alias: {
    label: 'Fasit alias',
    fieldType: 'text',
    value: ''
  },
  channelName: {
    label: 'Channel name',
    fieldType: 'text',
    value: ''
  },
  encrypted: {
    label: 'Encrypted connection',
    description: 'Adds TLS encryption on connection to MQ',
    value: false
  }
}
MqChannel.propTypes = {
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

export default connect(mapStateToProps)(MqChannel)
