import React from 'react'
const bastaLogo = require('../../../img/basta.png')
const navLogo = require('../../../img/nav.png')

const Login = props => {
  return (
    <div className="login-background">
      <div className="login-container">
        <img className="login-basta-logo" src={bastaLogo} />
        <div className="login-box">
          <img className="login-nav-logo" src={navLogo} />
          <div className="login-box-header">
            Single sign-on to <strong> NAV </strong>
          </div>
          <div className="login-box-body">
            <center> Authenticate by loggin into NAV's single sign-on provider. </center>
          </div>
          <div>
            <a className="login-box-btn" href="http://localhost:8080/login">
              <center> Continue </center>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
