// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import BookItem from '../component/book-item'
import Alert from '../component/alert'
import { MY_BOOKS_PAGE_ROUTE, LIBRARY_PAGE_ROUTE } from '../routes'

const ListContainer = styled.ul`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 2em;
`

type Props = {
  page: string,
  books: Array<mixed>,
  user: {
    logged: boolean,
  }
}

class BooksCollection extends React.Component<Props> {

  constructor(props) {
    super(props)

    this.alreadyRequestedChecker = this.alreadyRequestedChecker.bind(this)
  }

  alreadyRequestedChecker(book) {
    const usersRequested = book.requestedBy.map(requestor => requestor.userEmail)
    return usersRequested.includes(this.props.user.email)
  }

  render() {
    let bookList
    if (this.props.page === MY_BOOKS_PAGE_ROUTE) {
      // check if books and user are loaded in redux. If they are filter only books that are
      // owned by the user and map them in BookItem component
      bookList = (this.props.books.length > 0 && this.props.user.logged) ?
        this.props.books
          .filter(book => book.owner === this.props.user.email)
          // eslint-disable-next-line
          .map((myBook, index) => <BookItem key={index} imageUrl={myBook.imageUrl} requestedBy={myBook.requestedBy} bookId={myBook._id} page={MY_BOOKS_PAGE_ROUTE} />)
        : null
    } else if (this.props.page === LIBRARY_PAGE_ROUTE) {
      // check if books and user are loaded in redux. If they are filter only books that are
      // owned by the user and map them in BookItem component
      bookList = (this.props.books.length) ?
        this.props.books
          .map((book, index) => (
            <BookItem
              // eslint-disable-next-line
              key={index}
              imageUrl={book.imageUrl}
              bookId={book._id}
              page={LIBRARY_PAGE_ROUTE}
              alreadyRequested={this.alreadyRequestedChecker(book)}
            />),
          )
        : null
    } else {
      bookList = null
    }

    return (
      <div>
        <ListContainer className="mb-2">
          {bookList}
        </ListContainer>
        {this.props.showAlert && <Alert message={this.props.alertMessage} />}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books.titles,
  user: state.user,
  showAlert: state.userSettings.alert.show,
  alertMessage: state.userSettings.alert.message,
})

export default connect(mapStateToProps)(BooksCollection)
