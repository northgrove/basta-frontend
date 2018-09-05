import React, { Component } from 'react'

const navUserMenu = props => {
  const { user } = props

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
          <a href="https://account.activedirectory.windowsazure.com/r#/profile">
            {user.userProfile.userName}
          </a>
          <hr />
          <p>
            {' '}
            Tilganger: <br /> {roles}{' '}
          </p>
          <hr />
          <a href="api/v1/auth/logout">
            <i className="fa fa-sign-out" /> logout
          </a>
        </div>
      </div>
    </div>
  )
}

export default navUserMenu
