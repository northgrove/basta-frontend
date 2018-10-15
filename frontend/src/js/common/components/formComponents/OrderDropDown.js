import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import ReactTooltip from 'react-tooltip'

export const OrderDropDown = props => {
  const { label, description, value, alternatives, onChange } = props
  console.log(alternatives)
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
        <div className="formComponentDropdownField">
          <Select
            options={mapToOptions(alternatives)}
            setValue={value}
            onChange={e => onChange(e.value)}
          />
          <div className="formComponentDescription">{description}</div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  )
}
const mapToOptions = alternatives => {
  return typeof alternatives[0] === 'object'
    ? alternatives
    : alternatives.map(alt => {
        return { label: alt, value: alt }
      })
}

OrderDropDown.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  alternatives: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderDropDown
