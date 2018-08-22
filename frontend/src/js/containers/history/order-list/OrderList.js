import React from 'react'
import PropTypes from 'prop-types'
import OrderCard from './OrderCard'


const OrderList = (props) => {
    const { orderHistory } = props
    return (
        <div>
            OrderList
            {renderList(orderHistory)}
            <OrderCard />
        </div>
    )
}

const renderList = (orders) => {
    let orderList = []
    if (orders.length >= 1000) {
        console.log('1000')
        orders.forEach((e, i) => {
            orderList.push(
                <div key={i}>
                    <OrderCard order={e}/>
                </div>
            )
        })
    } else {
        console.log('do nothing')
    }
    return orderList

}

OrderList.propTypes = {

    orderHistory: PropTypes.array
}

export default OrderList