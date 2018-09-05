import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const Results = props => {
  return (
    <div className="results">
      <div className="panel panel-default">
        <div className="panel-heading">Results</div>
        <div className="panel-body">
          <div className="infobox">
            <div className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

Results.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default Results
