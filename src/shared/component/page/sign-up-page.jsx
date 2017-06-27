// @flow

import React from 'react'
import Helmet from 'react-helmet'

import SignUpFormContainer from '../../container/sign-up-form'

const title = 'Sign Up'

const SignUpPage = props => {
  return (<div className="container mt-5">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'A Sign Up Page' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <SignUpFormContainer history={props.history} />
      </div>
    </div>
  </div>)
}

export default SignUpPage
