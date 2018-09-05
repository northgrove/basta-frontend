import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import moment from 'moment'

import PageHeading from '../../common/components/PageHeading'
import Spinner from '../../common/components/Spinner'
import Request from './Request'
import Results from './Results'
import Log from './Log'
import { getOrder, getStatusLog } from './actionCreators'

export class OrderDetails extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { order, dispatch } = this.props
    if (!order.data) {
      dispatch(getOrder(this.props.match.params.orderId))
      dispatch(getStatusLog(this.props.match.params.orderId))
    }
  }

  render() {
    const { details, statuslog } = this.props.order
    console.log(this.props.order)
    return details.data ? (
      <div>
        <PageHeading
          icon="fa-refresh"
          heading={details.data.id.toString()}
          description={
            details.data.orderOperation +
            ' | ' +
            details.data.orderType +
            ' | ' +
            details.data.orderDescription +
            ' | ' +
            moment(details.created).fromNow()
          }
        />
        <div className="orderDetails">
          <Results data={details.data.results} />
          <Request data={details.data} />
          <Log data={statuslog} />
        </div>
      </div>
    ) : (
      <Spinner />
    )
  }
}

OrderDetails.propTypes = {}

const mapStateToProps = state => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderDetails)
