import React, { Component } from 'react'
import { getOrderHistory } from './actionCreators'
import PageHeading from '../../common/components/PageHeading'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import OrderFilter from '../../common/components/OrderFilter'



class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            even: 'er kul'
        }
    }

    filterString(filter) {
        console.log('filtering', filter)
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getOrderHistory(10))
    }

    render() {
        return (
            <div>
                <PageHeading icon='fa-history' heading='Order history' description='' />
                <OrderFilter onChange={(e) => this.filterString(e)} />
            </div>
        )
    }
}

History.propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderHistory: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        orderHistory: state.orders.orderHistory
    }
}

export default connect(mapStateToProps)(History)