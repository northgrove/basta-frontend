
import React, { Component } from 'react'
import { Routes } from '../common/routes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Tabs from 'nav-frontend-tabs'
import NavMenu from './navMenu/NavMenu'
import history from '../common/history'
import { userSsessionRequest } from '../common/actionCreators'
import { toggleNavMenu} from './navMenu/actionCreators'


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
                    <div className='navBrand' href='/'><img className='navLogo' src={bastaLogo} onClick={() => history.push('/')}/>
                        <div className='navName'>basta</div>
                    </div>
                </header>
                <div className='navLeft' />
                <nav>
                    <Tabs
                        className='navTabs'
                        tabs={[{ 'label': 'History' }, { 'label': 'Create' }, { 'label': 'Operate' }]}
                        onChange={(e) => this.navigate(e.target.textContent)}
                    />
                    <div className='navSmall' onClick={() => this.props.dispatch(toggleNavMenu())} >
                        <i className='fa fa-bars fa-2x navSmallButton'/>
                    </div>
                </nav>
                <div className='navRight' />
                <main>
                    <NavMenu />
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