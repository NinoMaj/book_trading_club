// @flow

import $ from 'jquery'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

import { APP_NAME } from '../config'
import {
  HOME_PAGE_ROUTE,
  LIBRARY_PAGE_ROUTE,
  MY_BOOKS_PAGE_ROUTE,
  SIGN_UP_PAGE_ROUTE,
  LOGIN_PAGE_ROUTE,
  SETTINGS_PAGE_ROUTE,
  LOGOUT_PAGE_ROUTE,
} from '../routes'

const handleNavLinkClick = () => {
  $('body').scrollTop(0)
  $('.js-navbar-collapse').collapse('hide')
}

const Icon = styled.i`
  font-size: 1.5em;
`

type Props = {
  user: Object,
}
const Nav = ({ user }: Props) => {
  const userNav = user.logged ?
  [
      { route: SETTINGS_PAGE_ROUTE, label: <Icon className="fa fa-cog" title="Settings" /> },
      { route: LOGOUT_PAGE_ROUTE, label: <Icon className="fa fa-power-off" title="Logout" /> },
  ] : [
      { route: SIGN_UP_PAGE_ROUTE, label: 'Sign-up page' },
      { route: LOGIN_PAGE_ROUTE, label: 'Login page' },
    ]
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span className="navbar-toggler-icon" />
      </button>
      <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
      <div className="js-navbar-collapse collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {[
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            { route: LIBRARY_PAGE_ROUTE, label: 'Library' },
            { route: MY_BOOKS_PAGE_ROUTE, label: 'My Books' },
          ].filter((link) => {
            if (!user.logged && link.route === MY_BOOKS_PAGE_ROUTE) {
              return false
            }
            return true
          }).map(link => (
            <li className="nav-item" key={link.route}>
              <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
        <ul className="navbar-nav ml-auto">
          {[
            ...userNav,
          ].map(link => (
            <li className="nav-item" key={link.route}>
              <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>{link.label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
