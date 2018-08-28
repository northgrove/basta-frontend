import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

export const OrderDropDown = props => {
  const { label, description, value, alternatives, onChange } = props
  console.log(value)

  return (
    <div className="formComponentGrid">
      <div className="formComponentLabel">{label}</div>
      <div className="formComponentDropdownField">
        <Select
          options={mapToOptions(alternatives)}
          setValue={value}
          onChange={e => onChange(e.value)}
        />
        <div className="formComponentDescription">{description}</div>
      </div>
    </div>
  )
}
const mapToOptions = alternatives => {
  return alternatives.map(alt => {
    return { label: alt, value: alt }
  })
}

OrderDropDown.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.number,
  alternatives: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderDropDown
