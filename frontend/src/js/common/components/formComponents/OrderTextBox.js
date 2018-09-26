import React from 'react'
import ReactTooltip from 'react-tooltip'

import PropTypes from 'prop-types'

export const OrderTextBox = props => {
  const { label, value, onChange, description, placeholder } = props
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
          className="formComponentTextField"
          type="text"
          placeholder={placeholder || 'description...'}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
      <ReactTooltip />
    </div>
  )
}
OrderTextBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func
}

export default OrderTextBox
