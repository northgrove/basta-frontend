import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const Request = props => {
  console.log(props)
  return (
    <div className="resquest">
      <div className="panel panel-info">
        <div className="panel-heading">
          <i className="fa fa-list-alt" /> Request
        </div>
        <div className="panel-body">
          <ul className="nav nav-tabs">
            <li className={''}>
              <Link to="/">
                <i className="fa fa-list-alt" />
                &nbsp;&nbsp;Overview
              </Link>
            </li>
            <li className={''}>
              <Link to="/create">
                <i className="fa fa-list-alt" />
                &nbsp;&nbsp;Form
              </Link>
            </li>
          </ul>
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
