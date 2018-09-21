import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import moment from 'moment'
import history from '../../common/history'

function buildResultBody(data, type) {
  switch (type) {
    case 'VM':
      return (
        <div>
          {data.map(result => {
            const options = mapToOptions(result.history)
            return (
              <div className="resultLine" key={'resultline_' + result.id}>
                <div className="result">{result.resultName}</div>
                <div className="history">
                  <Select
                    isSearchable={false}
                    onChange={e => history.push(`/orders/${e.value}`)}
                    options={options}
                    value={options[0]}
                  />
                </div>
                <div className="operations">
                  <i className="fa fa-wrench" />{' '}
                </div>
              </div>
            )
          })}
        </div>
      )
  }
}

const mapToOptions = results => {
  return results.map(result => {
    const label =
      result.id +
      ' ' +
      result.orderOperation.toLowerCase() +
      ' (' +
      moment(result.created).fromNow() +
      ')'
    return { label, value: result.id }
  })
}
const Results = props => {
  const { data, type } = props
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
