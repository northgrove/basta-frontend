import React, { Component } from 'react'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'
import Select from 'react-select'
import { fetchVmInfo } from '../../actionCreators'

export class OperateSeraNodeLookup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: '',
      hostnames: []
    }
  }

  componentDidMount() {}

  handleChange(event) {
    const { dispatch } = this.props
    const { hostnames } = this.state
    this.splitMatchAndTrim(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  findHostnames(hostnames) {}

  splitMatchAndTrim(hostnames) {
    const arr = hostnames.split(',').map(e => {
      const trimmed = e.trim()
      if (trimmed.match(/^\w+\.\w+\.\w+$/)) return trimmed
    })
    this.setState({ hostnames: arr })
  }

  serverList() {
    return this.state.hostnames.map((e, i) => {
      return (
        <div className="operationsServerEntry" key={i}>
          {' '}
          {e}{' '}
        </div>
      )
    })
  }

  render() {
    const { label, description, placeholder } = this.props
    console.log(this.state)
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
          <div className="operationsServerList">{this.serverList()}</div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

OperateSeraNodeLookup.propTypes = {}

const mapStateToProps = state => {
  return {
    vmsWithInfo: state.orderFormData.vmOperations.data
  }
}
export default connect(mapStateToProps)(OperateSeraNodeLookup)

// ^.+\..+\..+

// ^\w+\.\w+\.\w+$|^\w+\.\w+\-\w+\.\w+$
