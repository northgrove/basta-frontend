import React from 'react'

const navUserMenu = props => {
  const { user, userLogout, dispatch, visibility } = props

  let roles
  if (user.isUserAuthenticated) {
    roles = user.userProfile.roles.join(', ')
  } else {
    roles = 'error'
  }

  return (
    <div className="navUserMenu-content">
      <a href="https://account.activedirectory.windowsazure.com/r#/profile">
        {user.userProfile.userName}
      </a>
      <hr />
      <p>
        {' '}
        Access: <br /> {roles}{' '}
      </p>
      <hr />
      <a
        className="navUserMenu-signout"
        onClick={() => {
          dispatch(userLogout())
        }}
      >
        <i className="fa fa-sign-out" /> Sign out
      </a>
    </div>
  )
}

export default navUserMenu
