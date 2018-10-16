import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import { fetchMqClusters, clearMqClusters } from '../../actionCreators'
import connect from 'react-redux/es/connect/connect'

export class MqClusterCheckBox extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps, prevState, SS) {
    const { dispatch, queueManager, environmentClass } = this.props
    if (queueManager && prevProps.queueManager != queueManager && queueManager != '') {
      dispatch(fetchMqClusters(environmentClass, queueManager))
    }
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch(clearMqClusters())
  }

  guessClusterName() {
    const { environmentClass, environmentName } = this.state
    if (environmentClass === 'u') {
      return 'NL.DEV.D1.CLUSTER'
    }
    const envs = {
      u: 'DEV',
      t: 'TEST',
      q: 'QASS',
      p: 'PROD'
    }
    return `NL.${envs[environmentClass]}.${environmentName.toUpperCase()}.CLUSTER`
  }
  render() {
    const { label, value, description, onChange, clusters } = this.props
    console.log(clusters)
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
          <div className="formComponentCheckBoxContainer">
            <input type="checkbox" checked={value} />
            <span className="formComponentCheckBox" onClick={() => onChange(!value)} />
          </div>
          <div className="formComponentDescription">{description}</div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

MqClusterCheckBox.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func
}

const mapStateToProps = state => {
  return {
    clusters: state.orderFormData.clusters.data
  }
}
export default connect(mapStateToProps)(MqClusterCheckBox)
