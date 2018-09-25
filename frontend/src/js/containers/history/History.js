import React, { Component } from 'react'
import { applyOrderHistoryFilter } from './actionCreators'
import PageHeading from '../../common/components/PageHeading'
import BottomScrollListener from '../../common/components/BottomScrollListener'
import propTypes from 'prop-types'
import { connect } from 'react-redux'
import OrderFilter from '../../common/components/OrderFilter'
import OrderList from './order-list/OrderList'

class History extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      nMaxResults: 100
    }
  }

  filterString(filter) {
    this.setState({
      filter
    })
  }

  onBottom() {
    this.setState({ nMaxResults: this.state.nMaxResults + 100 })
  }

  componentDidMount() {
    const { dispatch } = this.props
    const { filter, nMaxResults } = this.state
    dispatch(applyOrderHistoryFilter(filter, nMaxResults))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.filter !== prevState.filter) {
    }
  }

  render() {
    const { filteredOrderHistory } = this.props
    console.log(this.props)

    return (
      <div>
        <BottomScrollListener onBottom={() => this.onBottom()} />
        <PageHeading icon="fa-history" heading="Order history" description="" />
        <OrderFilter onChange={e => this.filterString(e)} />
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
    filteredOrderHistory: state.orderHistory.filteredOrderHistory
  }
}

export default connect(mapStateToProps)(History)
