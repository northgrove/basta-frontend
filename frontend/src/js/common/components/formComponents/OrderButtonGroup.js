import React from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'


const OrderButtonGroup = props => {
  const { label, value, description, alternatives, onChange } = props
  return (
    <div className="formComponentGrid">
        <div className="formComponentLabel">{label}{description?<i className='fa fa-question-circle formComponentLabelDescription' data-tip={description}/>:null}</div>
      <div className="formComponentField">
        <div className="formComponentButtonGroup">
          {alternatives.map(alt => {
            return (
              <button
                className={alt.value === value ? 'active' : null}
                key={alt.value}
                onClick={() => onChange(alt.value)}
              >
                {alt.label}
              </button>
            )
          })}
        </div>
        <div className="formComponentDescription">{description}</div>
      </div>
        <ReactTooltip />

    </div>
  )
}
OrderButtonGroup.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  alternatives: PropTypes.array,
  onChange: PropTypes.func
}

export default OrderButtonGroup
