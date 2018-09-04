import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import PageHeading from '../../common/components/PageHeading'
import moment from 'moment'
export class OrderDetails extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {}

  render() {
    const { data } = this.props.order
    console.log(data)
    return (
      <div>
        <PageHeading
          icon="fa-refresh"
          heading={data.id.toString()}
          description={
            data.orderOperation +
            ' | ' +
            data.orderType +
            ' | ' +
            data.orerDescription +
            ' | ' +
            moment(data.created).fromNow()
          }
        />
      </div>
    )
  }
}

OrderDetails.propTypes = {}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.order
  }
}

export default connect(mapStateToProps)(OrderDetails)
