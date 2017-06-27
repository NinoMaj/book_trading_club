// @flow

import React from 'react'
import styled from 'styled-components'

import { APP_NAME } from '../config'

const Link = styled.a`
  margin-left: 5px;
  color: inherit;
  text-decoration: none; 
`

const Icon = styled.i`
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`

const Text = styled.p`
margin-bottom: 0px;
`

const Footer = () =>
  (<div className="container mt-5 mb-2">
    <hr />
    <footer>
      <Text>© {APP_NAME}, 2017</Text>
      <Text>Nino Majder
        <Link href="https://www.linkedin.com/in/nino-majder-93558911?trk=nav_responsive_tab_profile">
          <Icon className="fa fa-linkedin" />
        </Link>
        <Link href="https://github.com/NinoMaj">
          <Icon className="fa fa-github" />
        </Link>
      </Text>
    </footer>
  </div>)

export default Footer
