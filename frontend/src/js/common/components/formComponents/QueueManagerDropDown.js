import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchResources } from '../../actionCreators'

export class QueueManagerDropDown extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchResources('u'))
    dispatch(fetchResources('t'))
    dispatch(fetchResources('q'))
    dispatch(fetchResources('p'))
  }

  render() {
    const { label, value, onChange, description, resources, envClass, envName } = this.props
    console.log(resources[envClass])

    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">{label}</div>
        <div className="formComponentField">
          <div className="formComponentDropdownField">
            <Select
              //              options={mapToOptions(resources)}
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
}
const mapToOptions = alternatives => {
  return alternatives.map(alt => {
    return { label: alt, value: alt }
  })
}
QueueManagerDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    resources: state.orderFormData.resources.data
  }
}
export default connect(mapStateToProps)(QueueManagerDropDown)
