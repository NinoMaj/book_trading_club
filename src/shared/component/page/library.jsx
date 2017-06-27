// @flow

import React from 'react'
import Helmet from 'react-helmet'

import BooksCollection from '../../container/books-collection'
import { LIBRARY_PAGE_ROUTE } from '../../routes'

const title = 'Library:'

const LibraryPage = () =>
  (<div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'Library' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row">
      <div className="col-12">
        <h2>{title}</h2>
        <BooksCollection page={LIBRARY_PAGE_ROUTE} />
      </div>
    </div>
  </div>)

export default LibraryPage
