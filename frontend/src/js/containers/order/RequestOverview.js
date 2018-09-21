import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const RequestOverview = props => {
  const { data } = props
  return (
    <div className="results">
      <div className="overviewGrid">
        <div className="overviewLabel">Order Status</div>
        <div className="overviewValue">{getOrderStatus(data.status)}</div>
        <div className="overviewLabel">Created By</div>
        <div className="overviewValue">{`${data.createdByDisplayName} (${data.createdBy})`}</div>
        <div className="overviewLabel">Created Date</div>
        <div className="overviewValue">{moment(data.created).format('lll')}</div>
        <div className="overviewLabel">External ID</div>
        <div className="overviewValue">{data.externalId}</div>
      </div>
    </div>
  )
}

const getOrderStatus = status => {
  switch (status) {
    case 'SUCCESS':
      return (
        <span className="badge success">
          {' '}
          <i className="fa fa-check" /> {status}
        </span>
      )
    case 'WARNING':
      return (
        <span className="badge warning">
          {' '}
          <i className="fa fa-flag" /> {status}
        </span>
      )
    case 'PROCESSING':
      return (
        <span className="badge info">
          {' '}
          <i className="fa fa-recycle" /> {status}
        </span>
      )
    case 'ERROR':
      return (
        <span className="badge error">
          {' '}
          <i className="fa fa-exclamation-triangle" /> {status}
        </span>
      )
  }
  return <span> {status}</span>
}
RequestOverview.propTypes = {
  data: PropTypes.object
}

export default RequestOverview
