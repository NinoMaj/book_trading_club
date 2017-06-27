import React from 'react'
import styled from 'styled-components'

import AcceptIcon from './accept-icon'
import XButton from './x-button'

const ShowOnHover = styled.span`
  display: none;
  line-height: 12px;
`

const Item = styled.li`
  list-style: none;
  position: relative;
  padding-top: 8px;
  &:hover ${ShowOnHover}{
    display: inline;
  }
`

const BookTitle = styled.span`
  font-style: italic;
  margin-right: 10px;
`
const Requestor = styled.span`
  font-weight: 600;
`

const BlueBullet = styled.span`
  color: #5BC0DE;
`
// eslint-disable-next-line
type Props = {
  bookId: string,
  bookTitle: string,
  requestorName: string,
  requestorEmail: string,
  requestId: string,
  acceptClicked: () => mixed,
  xClicked: () => mixed,
}

const ApprovalItem = ({ bookId,
  bookTitle,
  requestorName,
  requestorEmail,
  requestId,
  acceptClicked,
  xClicked,
  // eslint-disable-next-line
}: Props) => (
  <Item>
    <BlueBullet>{'>'} </BlueBullet><Requestor>{requestorName}</Requestor> wants to borrow <BookTitle>{bookTitle}</BookTitle>
    <ShowOnHover>
      <AcceptIcon title="Accept to borrow this book" marginRight="5px" acceptClicked={() => acceptClicked(bookId, requestorEmail)} />
      <XButton title="Reject to borrow this book" xClicked={() => xClicked(bookId, requestId)} />
    </ShowOnHover>
  </Item>
  )

export default ApprovalItem
