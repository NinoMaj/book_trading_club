// @flow

import React from 'react'
import Helmet from 'react-helmet'

import { APP_NAME } from '../../config'
import HomeCover from '../home-cover'
import Cards from '../cards'
import Footer from '../footer'

// const CardContainer = styled(Card) `
//   margin: 0 auto;
//   text-align: center;
//   width: 700px;
// `

const HomePage = () =>
  (<div>
    <Helmet
      meta={[
        { name: 'description', content: 'Hello App is an app to say hello' },
        { property: 'og:title', content: APP_NAME },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <HomeCover />
    <Cards />
    <Footer />
  </div>
)

export default HomePage
