import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import history from '../../common/history'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export class Orders extends Component {
  constructor(props) {
    super(props)
  }

  componentWillReceiveProps(nextProps) {
    const { orders } = nextProps
    console.log(orders.orderId)
    if (Number.isInteger(orders.orderId)) {
      history.push('/orders/' + orders.orderId)
    }
  }

  render() {
    const { orders } = this.props
    if (orders.fetching) {
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
    } else if (orders.failed) {
      return (
        <div className="panel panel-error">
          <div className="panel-heading">Submitting form failed</div>
          <div className="panel-body">
            <div className="infobox">
              <div className="icon">
                <i className="fa fa-exclamation-circle" aria-hidden="true" />
              </div>
              <div className="content">{orders.error}</div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }
}

Orders.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}

export default connect(mapStateToProps)(Orders)
