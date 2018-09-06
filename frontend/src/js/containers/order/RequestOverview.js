import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

const RequestOverview = props => {
  const { data } = props
  console.log(data)
  return (
    <div className="results">
      <div className="overviewGrid">
        <div className="overviewLabel">Order Status</div>
        <div className="overviewValue">{data.status}</div>
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

RequestOverview.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default RequestOverview
