import React, { Component } from 'react'
import { Routes } from '../common/routes'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import NavMenuSmall from './navMenu/NavMenuSmall'
import history from '../common/history'
import { withRouter } from 'react-router-dom'
import { initializeApplication, fetchPhoto } from '../common/actionCreators'
import { closeNavMenu, toggleNavMenu } from './navMenu/actionCreators'
import NavMenu from './navMenu/NavMenu'
import Login from '../containers/login/Login'
import moment from 'moment'

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

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props
    //console.log(nextProps.user.currentUser.userName)
    if (nextProps.user.currentUser.userName && !nextProps.user.userPhoto) {
      //dispatch(fetchPhoto(nextProps.user.currentUser.userName))
    }
  }

  render() {
    let roles
    if (this.props.user.isUserAuthenticated) {
      roles = this.props.user.currentUser.roles.join(', ')
    } else {
      roles = 'error'
    }
    const { user, appReady } = this.props
    let photo = this.props.user.userPhoto
    console.log(photo)

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
            <div className="navUser">
              <div className="navUserMenu">
                <img className="navUserImage" src={photo} width="45" height="45" />
                <div className="navUserMenu-content">
                  <p>{this.props.user.currentUser.userName}</p>
                  <p> Tilgang: {roles} </p>
                  <a href="/logout">
                    <i className="fa fa-sign-out" /> logout
                  </a>
                </div>
              </div>
            </div>
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
