// @flow

import React from 'react'
import styled from 'styled-components'

const XButtonStyled = styled.span`
  color: rgba(220, 0, 0, 0.6);
  font-size: 24px;
  font-weight: bold;
  position: ${props => props.position ? props.position : 'static'};
  top: ${props => props.top ? props.top : 'auto'};
  left: ${props => props.left ? props.left : 'auto'};

  &:hover {
    color: rgba(255, 0, 0, 1);
    cursor: pointer;
  } 
`
type Props = {
  title: string,
  xClicked: ?Function,
  position: ?string,
  top: ?string,
  left: ?string,
}

const XButton = ({ title, xClicked, position, top, left }: Props) => (
  <XButtonStyled
    title={title}
    onClick={xClicked}
    position={position}
    top={top}
    left={left}
    >x
  </XButtonStyled>
)

export default XButton
// left: 108px;
// top: -6px;
