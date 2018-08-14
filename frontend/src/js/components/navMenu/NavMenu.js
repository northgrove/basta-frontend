import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'


class NavMenu extends Component {
    render() {
        if (!this.props.navMenu.visible) return null
        return (
            <div className='navMenu'>
                <ul>
                    <li><Link to={'/'}>History</Link></li>
                    <li><Link to={'/operate'}>Operate</Link></li>
                    <li><Link to={'/create'}>Create</Link></li>
                    <li>User</li>
                </ul>
            </div>
        )
    }
}


NavMenu.propTypes = {
    navMenu: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        navMenu: state.navMenu
    }
}

export default connect(mapStateToProps)(NavMenu)