import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import { NodeInformation } from './NodeInformation'
import Select from 'react-select'
import { fetchVmInfo } from '../../actionCreators'

export class OperateSeraNodeLookup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, vmInfoArr } = this.props
    const { hostnames } = this.state
    if (prevState.hostnames !== hostnames) {
      dispatch(fetchVmInfo(hostnames))
    }
  }

  handleChange(event) {
    this.splitMatchAndTrim(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  splitMatchAndTrim(hostnames) {
    let set = new Set()
    const arr = hostnames.split(',')
    arr.forEach(e => {
      const trimmed = e.trim()
      if (trimmed.match(/^\w+\.\w+\.\w+$/)) set.add(trimmed)
    })
    if (set.size > 0) this.setState({ hostnames: set })
  }

  serverList(hostnames) {
    let elements = []
    if (hostnames) {
      hostnames.forEach((e, i) => {
        elements.push(<NodeInformation key={i} hostname={e} />)
      })
    }
    return elements
  }

  render() {
    const { label, description, placeholder } = this.props
    const { hostnames } = this.state
    console.log(this.state)
    // console.log(vmInfoArr)
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
            name="input"
            type="text"
            placeholder={placeholder || 'description...'}
            value={this.state.input}
            onChange={e => this.handleChange(e)}
          />
          <div className="operationsServerList">{this.serverList(hostnames)}</div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

OperateSeraNodeLookup.propTypes = {}

const mapStateToProps = state => {
  return {
    vmInfoArr: state.orderFormData.vmOperations.data
  }
}
export default connect(mapStateToProps)(OperateSeraNodeLookup)

// ^.+\..+\..+

// ^\w+\.\w+\.\w+$|^\w+\.\w+\-\w+\.\w+$
