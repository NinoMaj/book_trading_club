// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { logout } from '../../action/auth'

const title = 'Logout'

type Props = {
  history: Object,
  logoutAction: Function,
}

const LogoutPage = ({ history, logoutAction }: Props) => {
  setTimeout(() => {
    logoutAction()
    history.push('/login')
  }, 2000)
  return (<div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Logout' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <p>Logging out...</p>
      </div>
    </div>
  </div>)
}

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(logout()),
})

export default connect(null, mapDispatchToProps)(LogoutPage)
