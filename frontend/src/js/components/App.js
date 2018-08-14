
import React, { Component } from 'react'
import { Routes } from '../common/routes'
import { connect } from 'react-redux'
import Tabs from 'nav-frontend-tabs'
import history from '../common/history'
import PropTypes from 'prop-types'
import { userSsessionRequest } from '../common/actionCreators'
const bastaLogo = require('../../img/basta.png')

class App extends Component {

    navigate(location) {
        if (location === 'History') location = '/'
        history.push(location.toLowerCase())
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(userSsessionRequest())
    }

    render() {
        return (
            <div className='wrapper'>
                <header>
                    <a className='navBrand' href='/'><img className='navLogo' src={bastaLogo} />
                        <div className='navName'>basta</div>
                    </a>
                </header>
                <div className='navLeft' />
                <nav>
                    <Tabs
                        className='navTabs'
                        tabs={[{ 'label': 'History' }, { 'label': 'Create' }, { 'label': 'Operate' }]}
                        onChange={(e) => this.navigate(e.target.textContent)}
                    />
                    <div className='navSmall'>small</div>
                </nav>
                <div className='navRight' />
                <main>
                    <Routes />
                </main>
                <footer></footer>
            </div>)
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(App)