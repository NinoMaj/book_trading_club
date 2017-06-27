// @flow

import React from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0%{color: rgba(122, 193, 66, 0)}
  100%{color: rgba(122, 193, 66, 1)}
`

const RequestSent = styled.i`
  color: rgba(122, 193, 66, 1);
  font-size: 20px;
  position: ${props => props.position ? props.position : 'static'};
  top: ${props => props.top ? props.top : 'auto'};
  left: ${props => props.left ? props.left : 'auto'};
  right: ${props => props.right ? props.right : 'auto'};
  margin-right: ${props => props.marginRight ? props.marginRight : 'auto'};
  animation: ${fadeIn} 0.5s linear 1;
`

type Props = {
  title: string,
  acceptClicked: ?Function,
  position: ?string,
  top: ?string,
  left: ?string,
  right: ?string,
  marginRight: ?string,
}

const RequestSentIcon = ({
  title,
  acceptClicked,
  position,
  top,
  left,
  right,
  marginRight,
}: Props) => (
  <RequestSent
    className="fa fa-check"
    title={title}
    onClick={acceptClicked}
    position={position}
    top={top}
    left={left}
    right={right}
    marginRight={marginRight}
  />
)

export default RequestSentIcon
