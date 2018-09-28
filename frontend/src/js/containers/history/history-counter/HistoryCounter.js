import React from 'react'
import propTypes from 'prop-types'

export const HistoryCounter = props => {
  const { totalOrders, displayingOrders } = props
  return (
    <div className="history-counter-container">
      <div className="history-counter-value">
        <center>
          <h3>{`${displayingOrders}/${totalOrders}`}</h3>
        </center>
      </div>
    </div>
  )
}

HistoryCounter.propTypes = {
  onChange: propTypes.func
}

export default HistoryCounter
