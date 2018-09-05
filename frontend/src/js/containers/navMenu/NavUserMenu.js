import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavUserMenu extends Component {
  render() {
    const { user } = this.props

    let roles
    if (user.isUserAuthenticated) {
      roles = user.userProfile.roles.join(', ')
    } else {
      roles = 'error'
    }

    let photo = user.userProfile.photo

    return (
      <div className="navUser">
        <div className="navUserMenu">
          <img className="navUserImage" src={photo} width="45" height="45" />
          <div className="navUserMenu-content">
            <p>{user.userProfile.userName}</p>
            <p>
              {' '}
              Tilgang: <br /> {roles}{' '}
            </p>
            <a href="api/v1/auth/logout">
              <i className="fa fa-sign-out" /> logout
            </a>
          </div>
        </div>
      </div>
    )
  }
}

NavUserMenu.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(NavUserMenu)
