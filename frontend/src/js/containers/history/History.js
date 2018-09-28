import React, { Component } from 'react'
import { applyOrderHistoryFilter } from './actionCreators'
import PageHeading from '../../common/components/PageHeading'
import BottomScrollListener from '../../common/components/BottomScrollListener'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import { tagOrders, filterOrders, formatOrders } from './filters'
import HistoryFilter from '../../common/components/HistoryFilter'
import OrderList from './order-list/OrderList'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      nMaxResults: 20
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    const { dispatch } = this.props
    event.preventDefault()
    dispatch(applyOrderHistoryFilter(this.state.filter))
  }

  handleChange(event) {
    this.setState({ filter: event.target.value })
  }

  onBottom() {
    this.setState({ nMaxResults: this.state.nMaxResults + 20 })
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { filter, nMaxResults } = this.state
    dispatch(applyOrderHistoryFilter(filter))
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch } = this.props
    const { nMaxResults, filter } = this.state
  }

  render() {
    const { filteredOrderHistory } = this.props
    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <PageHeading icon="fa-history" heading="Order history" description="" />
        <HistoryFilter
          handleSubmit={event => this.handleSubmit(event)}
          handleChange={event => this.handleChange(event)}
        />
        <OrderList orderHistory={filteredOrderHistory.slice(0, this.state.nMaxResults)} />
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
    filteredOrderHistory: state.orderHistory.filteredOrderHistory
  }
}

export default connect(mapStateToProps)(History)
