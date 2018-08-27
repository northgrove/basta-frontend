import React, { Component } from 'react'
import connect from 'react-redux/es/connect/connect'

import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

export class OrderPage extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                Order
            </div>
        )
    }
}

OrderPage.propTypes = {}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(OrderPage)
