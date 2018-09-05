import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const Request = props => {
  return (
    <div className="resquest">
      <div className="panel panel-default">
        <div className="panel-heading">Request</div>
        <div className="panel-body">
          <div className="infobox">
            <div className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

Request.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default Request
