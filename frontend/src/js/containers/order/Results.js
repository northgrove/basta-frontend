import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'

function buildResultBody(data, type) {
  switch (type) {
    case 'VM':
      return (
        <div>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <td>host</td>
                <td>history</td>
                <td>Operations</td>
              </tr>
            </thead>
            <tbody>
              {data.map(result => {
                return (
                  <tr key={result.resultName}>
                    <td>{result.resultName}</td>
                    <td>{result.history.toString()}</td>
                    <td>Operations</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
  }
}

const Results = props => {
  const { data, type } = props
  console.log(data)
  return (
    <div className="results">
      <div className="panel panel-default">
        <div className="panel-heading">
          <i className="fa fa-server" /> Results
        </div>
        <div className="panel-body">{buildResultBody(data, type)}</div>
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
