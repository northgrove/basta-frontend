import React, { Component } from 'react'
import { Routes } from '../common/routes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavMenuSmall from './navMenu/NavMenuSmall'
import history from '../common/history'
import { withRouter } from 'react-router-dom'
import { initializeApplication } from '../common/actionCreators'
import { closeNavMenu, toggleNavMenu } from './navMenu/actionCreators'
import NavMenu from './navMenu/NavMenu'
import Login from '../containers/login/Login'
import moment from 'moment'
import NavUserMenu from './navMenu/NavUserMenu'

const bastaLogo = require('../../img/basta.png')

class App extends Component {
  navigate(location) {
    if (location === 'History') location = '/'
    history.push(location.toLowerCase())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(initializeApplication())
    moment.locale('nb')
  }

  render() {
    const { appReady, user } = this.props
    if (appReady) {
      return !user.isUserAuthenticated ? (
        <Login location={location} />
      ) : (
        <div className="wrapper">
          <header>
            <div className="navBasta">
              <div className="navBrand" href="/">
                <img className="navLogo" src={bastaLogo} onClick={() => history.push('/')} />
                <div className="navName">basta</div>
              </div>
            </div>
            <NavUserMenu user={user} />
          </header>
          <div className="navLeft" />
          <nav>
            <NavMenu className="navTabs" />
            <div className="navButton" onClick={() => this.props.dispatch(toggleNavMenu())}>
              <i className="fa fa-bars fa-2x navSmallButton" />
            </div>
          </nav>
          <div className="navRight" />
          <main onClick={() => this.props.dispatch(closeNavMenu())}>
            <NavMenuSmall />
            <Routes />
          </main>
          <footer />
        </div>
      )
    } else {
      return null
    }
  }
}

App.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  appReady: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.user,
    appReady: state.initialize.appReady
  }
}

export default withRouter(connect(mapStateToProps)(App))
