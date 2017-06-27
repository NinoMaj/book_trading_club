// @flow

import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ApprovalItem from '../component/approval-item'
import { acceptRequest, rejectRequest } from '../action/books'

const ApprovalContainer = styled.div`
  max-width: 730px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2em;
`

const ApprovalListContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 2em;
  flex-direction: column;
`

const Button = styled.button`
  width: 230px;
  padding: 10px auto;
  margin: 0 auto;
  display: block;
  position: relative;
  border: none;
  text-align: center;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;

  &:after {
    content: "";
    background: white;
    display: block;
    position: absolute;
    padding-top: 300%;
    padding-left: 350%;
    margin-left: -20px!important;
    margin-top: -120%;
    opacity: 0;
    transition: all 0.8s
  }

  &:active:after {
    padding: 0;
    margin: 0;
    opacity: 1;
    transition: 0s
}

  &:focus {
    box-shadow: none;
  }
`

const Chevron = styled.i`
  font-size: 1.2em;
  font-weight: 500;
  position: relative;

  top: 1px;
  left: 5px;
`


type Props = {
  acceptRequestAction: () => any,
  rejectRequestAction: () => any,
  books: mix,
  user: {
    email: string,
  } };

type State = {
  showRequests?: boolean,
};

class ApprovalList extends React.Component<Props, State> {

  constructor(props) {
    super(props)

    this.state = {
      showRequests: false,
    }

    this.showRequests = this.showRequests.bind(this)
    this.handleAcceptRequest = this.handleAcceptRequest.bind(this)
    this.handleRejectRequest = this.handleRejectRequest.bind(this)
  }

  showRequests() {
    this.setState({
      showRequests: !this.state.showRequests,
    })
  }

  handleAcceptRequest(bookId, requestorEmail) {
    this.props.acceptRequestAction(bookId: any, requestorEmail: string)
  }

  handleRejectRequest(bookId, requestId) {
    this.props.rejectRequestAction(bookId: string, requestId: string)
  }

  render() {
    const approvalList = this.props.books
      .filter(everyBook => everyBook.owner === this.props.user.email)
      .filter(myBook => myBook.requestedBy.length > 0)
      .map((myBookWithRequests) => {
        // eslint-disable-next-line
        const bookId = myBookWithRequests._id
        const bookTitle = myBookWithRequests.title
        return myBookWithRequests.requestedBy.map((request, index) =>
          // eslint-disable-next-line
          (<ApprovalItem
            bookId={bookId}
            bookTitle={bookTitle}
            requestorName={request.userName}
            requestorEmail={request.userEmail}
            // eslint-disable-next-line
            requestId={request._id}
            // eslint-disable-next-line
            key={index}
            acceptClicked={this.handleAcceptRequest}
            xClicked={this.handleRejectRequest}
          />),
        )
      })
    const showRequestedBooksButtonText = approvalList.length === 1 ?
      'See requested book'
      :
      'See requested books'
    const showRequestsButton = (this.state.showRequests) ?
      (<Button onClick={this.showRequests} className="btn"> Hide requests
        <Chevron className="fa fa-chevron-up" aria-hidden="true" />
      </Button>)
      :
      (<Button onClick={this.showRequests} className="btn"> {showRequestedBooksButtonText} <span className="badge badge-pill badge-info">{approvalList.length}</span>
        <Chevron className="fa fa-chevron-down" aria-hidden="true" />
      </Button>)

    return (
      <ApprovalContainer>
        {approvalList.length > 0 &&
          showRequestsButton}
        {this.state.showRequests &&
          <ApprovalListContainer>
            {approvalList}
          </ApprovalListContainer >
        }
      </ApprovalContainer>
    )
  }
}

const mapStateToProps = state => ({
  books: state.books.titles,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  acceptRequestAction: (bookId, requestId, requestorEmail) =>
    dispatch(acceptRequest(bookId, requestId, requestorEmail)),
  rejectRequestAction: (bookId, requestId) =>
    dispatch(rejectRequest(bookId, requestId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ApprovalList)
