import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

const OrderNumberBox = props => {
  const { label, min, max, description, onChange, value, valid } = props
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
        <input
          className="formComponentNumberField"
          maxLength="1"
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        />
        <div className="formComponentDescription">{description}</div>
        {!valid ? (
          <div className="formComponentError">
            Please enter a number between {min} and {max}
          </div>
        ) : null}
      </div>
      <ReactTooltip />
    </div>
  )
}
OrderNumberBox.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  valid: PropTypes.bool
}

export default OrderNumberBox
