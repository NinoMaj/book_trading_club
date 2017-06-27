// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { requestBook, acceptRequest, deleteBook } from '../action/books'
import { showAlert, hideAlert } from '../action/user-settings'
import { MY_BOOKS_PAGE_ROUTE, LIBRARY_PAGE_ROUTE } from '../routes'
import RequestIcon from './request-icon.jsx'
import AcceptIcon from './accept-icon.jsx'
import XButton from './x-button.jsx'
import RequestSentIcon from './request-sent-icon.jsx'

const ImageHolder = styled.li`
  width: 128px;
  height: 195px;
  list-style-type: none;
  margin-top: 1em;
  position: relative;
`

type Props = {
  imageUrl: string,
  requestedBy: Object,
  alreadyRequested: boolean,
}

class BookItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false,
    }

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.handleRequestClick = this.handleRequestClick.bind(this)
    this.handleAcceptClick = this.handleAcceptClick.bind(this)
    this.handleXClick = this.handleXClick.bind(this)
  }

  handleMouseEnter() {
    this.setState({
      hover: true,
    })
  }

  handleMouseLeave() {
    this.setState({
      hover: false,
    })
  }

  handleRequestClick() {
    this.props.requestBookAction(this.props.bookId, this.props.userEmail, this.props.userName)
    this.toggleAlert('The book is successfully requested.')
  }

  handleAcceptClick() {
    this.props.acceptRequestAction(this.props.bookId)
    this.toggleAlert("You've accept it to borrow a book")
  }

  handleXClick() {
    this.props.deleteBookAction(this.props.bookId)
    this.toggleAlert('The book is removed.')
  }

  toggleAlert(message) {
    this.props.showAlertAction(message)
    setTimeout(() => {
      this.props.hideAlertAction()
    }, 3000)
  }

  render() {
    let removeOrReqIcon
    let acceptIcon
    if (this.props.page === MY_BOOKS_PAGE_ROUTE) {
      removeOrReqIcon = <XButton xClicked={this.handleXClick} title="Remove" position="absolute" top="-6px" left="108px" />
      if (this.props.requestedBy.length > 0) {
        acceptIcon = <AcceptIcon title="Accept to borrow this book to first who requested it" acceptClicked={this.handleAcceptClick} position="absolute" top="28px" left="104px" />
      }
    } else if (this.props.page === LIBRARY_PAGE_ROUTE && this.props.userLogged) {
      // icon = <RequestIcon src={`${STATIC_PATH}/images/exchange-arrows.svg`} alt="exchange arrows" onClick={this.handleRequestClick} />
      removeOrReqIcon = (this.props.alreadyRequested === false) ? 
        <RequestIcon type="button" className="btn btn-primary" title="Request to borrow" requestClicked={this.handleRequestClick} top="2px" left="98px" />
        :
        <RequestSentIcon title="You've requested this book." position="absolute" top="2px" left="98px" />
    } else {
      removeOrReqIcon = null
    }
    return (
      <ImageHolder
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <img src={this.props.imageUrl} alt="book" />
        {this.state.hover && removeOrReqIcon}
        {this.state.hover && acceptIcon}
      </ImageHolder>
    )
  }
}

const mapStateToProps = state => ({
  userLogged: state.user.logged,
  userEmail: state.user.email,
  userName: state.user.name,
})

const mapDispatchToProps = dispatch => ({
  requestBookAction: (requestedBook, userEmail, userName) =>
    dispatch(requestBook(requestedBook, userEmail, userName)),
  acceptRequestAction: bookId => dispatch(acceptRequest(bookId)),
  deleteBookAction: bookId => dispatch(deleteBook(bookId)),
  showAlertAction: message => dispatch(showAlert(message)),
  hideAlertAction: () => dispatch(hideAlert()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BookItem)
