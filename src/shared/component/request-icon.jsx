// @flow

import React from 'react'
import styled from 'styled-components'

const RequestIconStyled = styled.i`
  color: rgba(244, 167, 66, 0.6);
  font-size: 22px;
  position: absolute;
  left: 98px;
  top: 2px;
  top: ${props => props.top ? props.top : 'auto'};
  left: ${props => props.left ? props.left : 'auto'};

  &:hover {
    color: rgba(244, 167, 66, 1);
    cursor: pointer;
  }
`

type Props = {
  title: string,
  requestClicked: ?Function,
  top: ?string,
  left: ?string,
}

const RequestIcon = ({ title, requestClicked, top, left }: Props) => (
  <RequestIconStyled
    className="fa fa-exchange"
    title={title}
    onClick={requestClicked}
    top={top}
    left={left}
  />
)

export default RequestIcon
