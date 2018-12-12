import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

export const NodeInformation = props => {
  const { hostname, key } = props
  return (
    <div className="operationsServerEntry" key={key}>
      {hostname}
    </div>
  )
}
NodeInformation.propTypes = {
  hostname: PropTypes.string.isRequired,
  key: PropTypes.number
}

export default NodeInformation
