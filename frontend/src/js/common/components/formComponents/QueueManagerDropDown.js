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
    const { dispatch, envClass, envName, application } = this.props
    dispatch(fetchResources('u'))
    dispatch(fetchResources('t'))
    dispatch(fetchResources('q'))
    dispatch(fetchResources('p'))
    dispatch(fetchScopedResources(envClass, envName, application))
  }
  componentDidUpdate(prevProps, prevState, ss) {
    const { dispatch, envName, envClass, application } = this.props
    if (
      prevProps.envName != envName ||
      prevProps.envClass != envClass ||
      prevProps.application != application
    ) {
      this.setState()
      dispatch(fetchScopedResources(envClass, envName, application))
    }
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
    console.log('scoped=', scopedresources)
    const options = mapToOptions(scopedresources)
    const selected = findOption(options, value)

    return (
      <div className="formComponentGrid">
        <div className="formComponentLabel">{label}</div>
        <div className="formComponentField">
          <div className="formComponentQueueManagerDropdownField">
            <Select options={options} value={selected} onChange={e => onChange(e.value)} />
            <div className="formComponentDescription">{description}</div>
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}
const mapToOptions = scopedResources => {
  return scopedResources.map(res => {
    console.log(res)
    let hostname = res.properties.find(prop => {
      return prop.name === 'hostname'
    }).value
    let port = res.properties.find(prop => {
      return prop.name === 'port'
    }).value
    let name = res.properties.find(prop => {
      return prop.name === 'name'
    }).value
    let label = `mq://${hostname}:${port}/${name} (${res.alias}) \n Fasit alias: ${res.alias}`
    let value = `mq://${hostname}:${port}/${name}`
    let display = `${res.alias} (${name})`
    return { label, value, display }
  })
}
const findOption = (options, value) => {
  const selected = options.find(o => o.value === value)
  return selected ? { label: selected.display, value: selected.value } : null
}
QueueManagerDropDown.propTypes = {}

const mapStateToProps = state => {
  return {
    resources: state.orderFormData.resources.data,
    scopedresources: state.orderFormData.scopedresources.data
  }
}
export default connect(mapStateToProps)(QueueManagerDropDown)
