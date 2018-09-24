import React from 'react'

const navUserMenu = props => {
  const { user, userLogout, dispatch } = props

  let roles
  if (user.isUserAuthenticated) {
    roles = user.userProfile.roles.join(', ')
  } else {
    roles = 'error'
  }
  return (
    <div className="navUserMenu">
      <div className="navUserImage">
        <img src={user.userProfile.photo} />
      </div>
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
    </div>
  )
}

export default navUserMenu
