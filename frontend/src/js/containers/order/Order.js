import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import history from '../../common/history'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export class Order extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { order } = nextProps
    if (Number.isInteger(order.orderId)) {
      history.push('/orders/' + order.orderId)
    }
  }

  render() {
    const { order } = this.props
    if (order.fetching) {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">Submitting form</div>
          <div className="panel-body">
            <div className="infobox">
              <div className="icon">
                <div className="spinner">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else if (order.failed) {
      return (
        <div className="panel panel-error">
          <div className="panel-heading">Submitting form failed</div>
          <div className="panel-body">
            <div className="infobox">
              <div className="icon">
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
              </div>
              <div className="content">{order.error}</div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

Order.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  }
}

export default connect(mapStateToProps)(Order)
