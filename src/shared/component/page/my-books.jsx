// @flow

import React from 'react'
import Helmet from 'react-helmet'

import MyBooksInput from '../../container/my-books-input'
import ApprovalList from '../../container/approval-list'
import BooksCollection from '../../container/books-collection'
import { MY_BOOKS_PAGE_ROUTE } from '../../routes'

const title = 'My Books:'

const MyBooksPage = () =>
  (<div className="container mt-4">
    <Helmet
      title={title}
      meta={[
        { name: 'description', content: 'My Books' },
        { property: 'og:title', content: title },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ]}
    />
    <div className="row mb-2">
      <div className="col-12">
        <h2>{title}</h2>
        <MyBooksInput />
        <ApprovalList />
        <BooksCollection page={MY_BOOKS_PAGE_ROUTE} />
      </div>
    </div>
  </div>)

export default MyBooksPage
