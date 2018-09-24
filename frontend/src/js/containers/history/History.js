import React, { Component } from 'react'
import { applyOrderHistoryFilter } from './actionCreators'
import PageHeading from '../../common/components/PageHeading'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import OrderFilter from '../../common/components/OrderFilter'
import OrderList from './order-list/OrderList'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      nMaxResults: 20
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    console.log('1')
    const { dispatch } = this.props
    const { filter, nMaxResults } = this.state
    dispatch(applyOrderHistoryFilter(filter, nMaxResults))
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props
    const { filter, nMaxResults } = this.state
    if (this.state.filter !== prevState.filter) {
      dispatch(applyOrderHistoryFilter(filter, nMaxResults))
    }
  }

  render() {
    console.log('hey')
    console.log(this.props)
    const { filteredOrderHistory } = this.props
    return (
      <div>
        <PageHeading icon="fa-history" heading="Order history" description="" /> */}
        <OrderFilter onChange={e => this.handleChange(e)} />
        <OrderList orderHistory={filteredOrderHistory} />
      </div>
    )
  }
}

History.propTypes = {
  dispatch: propTypes.func.isRequired,
  filteredOrderHistory: propTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    filteredOrderHistory: state.history.filteredOrderHistory
  }
}

export default connect(mapStateToProps)(History)
