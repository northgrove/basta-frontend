import React, {Component} from 'react'
import {Routes} from '../common/routes'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavMenuSmall from './navMenu/NavMenuSmall'
import history from '../common/history'
import {withRouter} from 'react-router-dom'
import {userSessionRequest} from '../common/actionCreators'
import {closeNavMenu, toggleNavMenu} from './navMenu/actionCreators'
import NavMenu from './navMenu/NavMenu'


const bastaLogo = require('../../img/basta.png')


class App extends Component {

    navigate(location) {
        if (location === 'History') location = '/'
        history.push(location.toLowerCase())
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(userSessionRequest())
    }

    render() {
        return (
            <div className='wrapper'>
                <header>
                    <div className='navBrand' href='/'>
                        <img className='navLogo' src={bastaLogo} onClick={() => history.push('/')}/>
                        <div className='navName'>basta</div>
                    </div>
                </header>
                <div className='navLeft'/>
                <nav>
                    <NavMenu className='navTabs'/>
                    <div className='navButton' onClick={() => this.props.dispatch(toggleNavMenu())}>
                        <i className='fa fa-bars fa-2x navSmallButton'/>
                    </div>
                </nav>
                <div className='navRight'/>
                <main onClick={() => this.props.dispatch(closeNavMenu())}>
                    <NavMenuSmall/>
                    <Routes/>
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

export default withRouter(connect(mapStateToProps)(App))