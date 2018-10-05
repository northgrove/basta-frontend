import React, { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchResources, fetchScopedResources } from '../../actionCreators'

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
    dispatch(fetchScopedResources('p', 'p', 'franz'))
  }
  componentDidUpdate(prevProps, prevState, ss) {
    console.log(prevProps)
  }

  render() {
    const {
      label,
      value,
      onChange,
      description,
      resources,
      envClass,
      envName,
      scopedresources
    } = this.props
    console.log(scopedresources)

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
    resources: state.orderFormData.resources.data,
    scopedresources: state.orderFormData.scopedresources.data
  }
}
export default connect(mapStateToProps)(QueueManagerDropDown)
