import React, { Component } from 'react'
import { getOrderHistory } from './actionCreators'
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
      nFilterResults: 100
    }
  }

  applyFilter(array, filter) {
    let multiArray = []
    let filteredArray = []
    const filters = filter.split(' ')
    filters.forEach((filter, i) => {
      multiArray[i] = this.filterArray(array, filter)
      if (i > 0) {
        multiArray[i] = this.filterArray(multiArray[i - 1], filter)
      }
      filteredArray = multiArray[i]
    })
    return filteredArray
  }

  filterArray(array, filter) {
    const regexp = new RegExp(filter, 'i')
    return array.filter(e => {
      let bool = false
      e.tags.forEach(tag => {
        if (tag.match(regexp)) bool = true
      })
      return bool
    })
  }

  filterString(filter) {
    this.setState({
      filter
    })
  }

  renderItems(nFilteredOrders, orderHistory) {
    const { filter } = this.state
    // const { orderHistory } = this.props
    const filteredArray = this.applyFilter(orderHistory, filter)
    const array = filteredArray.slice(0, nFilteredOrders)
    this.setState({
      filteredOrderHistory: array
    })
  }

  componentDidMount() {
    const { dispatch, orderHistory } = this.props
    dispatch(getOrderHistory(1000))
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.orderHistory !== prevProps.orderHistory ||
      this.state.filter !== prevState.filter
    ) {
      this.applyFilter(this.props.orderHistory, this.state.filter)
    }
  }

  render() {
    const { filteredOrderHistory } = this.state
    console.log(this.state)
    return (
      <div>
        <PageHeading icon="fa-history" heading="Order history" description="" />
        <OrderFilter onChange={e => this.filterString(e)} />
        <OrderList orderHistory={filteredOrderHistory} />
      </div>
    )
  }
}

History.propTypes = {
  dispatch: propTypes.func.isRequired,
  orderHistory: propTypes.array.isRequired
}

const mapStateToProps = state => {
  return {
    orderHistory: state.history.orderHistory
  }
}

export default connect(mapStateToProps)(History)
