// @flow

import React from 'react'
import Helmet from 'react-helmet'

import LoginContainer from '../../container/login-form'

const title = 'Login'

const LoginPage = props =>
  (<div className="container mt-5">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A Login Page' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <LoginContainer history={props.history} />
      </div>
    </div>
  </div>)

export default LoginPage
