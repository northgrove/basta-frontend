import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const OrderCheckBox = props => {
  const { label, value, description, onChange } = props
  return (
    <div className="formComponentGrid">
      <div className="formComponentLabel">
        {label}
        {description ? (
          <i
            className="fa fa-question-circle formComponentLabelDescription"
            data-tip={description}
          />
        ) : null}
      </div>
      <div className="formComponentField">
        <div className="formComponentCheckBoxContainer">
          <input type="checkbox" checked={value} />
          <span className="formComponentCheckBox" onClick={() => onChange(!value)} />
        </div>
        <div className="formComponentDescription">{description}</div>
      </div>
      <ReactTooltip />
    </div>
  )
}
OrderCheckBox.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

export default OrderCheckBox
