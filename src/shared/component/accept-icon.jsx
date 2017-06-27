// @flow

import React from 'react'
import styled from 'styled-components'

const AcceptIconStyled = styled.i`
  color: rgba(122, 193, 66, 0.6);
  font-size: 20px;
  position: ${props => props.position ? props.position : 'static'};
  top: ${props => props.top ? props.top : 'auto'};
  left: ${props => props.left ? props.left : 'auto'};
  right: ${props => props.right ? props.right : 'auto'};
  margin-right: ${props => props.marginRight ? props.marginRight : 'auto'};

  &:hover {
    color: rgba(122, 193, 66, 1);
    cursor: pointer;
  }
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

const AcceptIcon = ({ title, acceptClicked, position, top, left, right, marginRight }: Props) => (
  <AcceptIconStyled
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

export default AcceptIcon
