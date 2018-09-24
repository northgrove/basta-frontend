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
      nTotalOrders: 1000,
      nFilterResults: 100,
      filteredOrderHistory: []
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

  paceFiltering(nFilteredOrders) {
    // const nTotalOrders = 1000
    const { orderHistory } = this.props
    const orders = orderHistory.slice(0, this.state.nTotalOrders)
    this.renderItems(nFilteredOrders, orders)
    if (this.state.filteredOrderHistory.length < this.state.nFilterResults) {
      this.setState({
        nTotalOrders: this.state.nTotalOrders + (this.state.nTotalOrders + 1000)
      })
      this.renderItems(nFilteredOrders, orders)
    }
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
    document.addEventListener('scroll', this.handleOnScroll.bind(this))
    const { dispatch, orderHistory } = this.props
    dispatch(getOrderHistory(200))
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleOnScroll.bind(this))
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.orderHistory !== prevProps.orderHistory ||
      this.state.filter !== prevState.filter
    ) {
      this.paceFiltering(100)
    }
  }

  handleOnScroll() {
    const scrollNode = document.scrollingElement || document.documentElement
    if (scrollNode.scrollHeight <= scrollNode.scrollTop + window.innerHeight) {
      this.onBottom()
    }
  }

  onBottom() {
    this.setState({ nFilterResults: this.state.nFilterResults + 100 })
  }

  render() {
    const { filteredOrderHistory } = this.state

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
