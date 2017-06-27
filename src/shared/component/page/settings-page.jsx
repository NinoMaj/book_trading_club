// @flow

import React from 'react'
import Helmet from 'react-helmet'

import UserSettings from '../../container/user-settings'

const title = 'Settings'

const SettingsPage = () => {
  return (<div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Settings' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <UserSettings />
      </div>
    </div>
  </div>)
}

export default SettingsPage
