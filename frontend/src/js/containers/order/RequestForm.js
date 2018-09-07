import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'

const RequestForm = props => {
  const { data } = props
  console.log(data)
  return (
    <table className="requestForm">
      <tbody>
        {Object.keys(data).map(label => {
          return (
            <tr className="requestFormRow" key={label}>
              <td className="requestFormLabel">{label}</td>
              <td>{data[label]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

RequestForm.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  tags: PropTypes.array,
  url: PropTypes.string,
  access: PropTypes.array,
  enabled: PropTypes.bool
}

export default RequestForm
