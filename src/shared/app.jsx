// @flow

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { connect } from 'react-redux'

import { APP_NAME } from './config'
import Nav from './component/nav'
import HomePage from './component/page/home'
import LibraryPage from './component/page/library'
import MyBooksPage from './component/page/my-books'
import SignUpPage from './component/page/sign-up-page'
import LoginPage from './component/page/login-page'
import SettingsPage from './component/page/settings-page'
import LogoutPage from './component/page/logout-page'
import NotFoundPage from './component/page/not-found'
import { loginCheck } from './action/auth'
import { getBooks } from './action/books'
import {
  HOME_PAGE_ROUTE,
  LIBRARY_PAGE_ROUTE,
  MY_BOOKS_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  LOGOUT_PAGE_ROUTE,
} from './routes'

injectTapEventPlugin()

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!this.props.user.logged && typeof window !== 'undefined' && localStorage.token) {
      const decodedToken = JSON.parse(window.atob(localStorage.token.split('.')[1]))
      this.props.loginCheckAction({ email: decodedToken.email, name: decodedToken.name })
    }
    this.props.getBooksAction()
  }
  render() {
    return (
      <div style={{ paddingTop: 54 }}>
        <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
        <Nav user={this.props.user} />
        
        <Switch>
          <Route exact path={HOME_PAGE_ROUTE} render={() => <HomePage />} />
          <Route path={LIBRARY_PAGE_ROUTE} component={<LibraryPage />} />
          <Route path={MY_BOOKS_PAGE_ROUTE} render={<MyBooksPage />} />
          <Route path={SIGN_UP_PAGE_ROUTE} render={history => <SignUpPage history={history.history} />} />
          <Route path={LOGIN_PAGE_ROUTE} render={history => <LoginPage history={history.history} />} />
          <Route path={SETTINGS_PAGE_ROUTE} render={history => <SettingsPage history={history.history} />} />
          <Route path={LOGOUT_PAGE_ROUTE} render={history => <LogoutPage history={history.history} />} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  loginCheckAction: email => dispatch(loginCheck(email)),
  getBooksAction: () => dispatch(getBooks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
