// @flow

import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  margin-left: ${props => props.marginLeft ? props.marginLeft : '5px'};
  border: none;
  display: inline-block;
  outline: 0;
  padding: 6px 14px;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  -khtml-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  color: #fff;
  background-color: #5BC0DE;
  font-size: 1.4em;

  &:hover {
    color: #000;
    background-color: #ccc;
  }
`

type Props = {
  label: string,
  handleClick: Function,
  marginLeft: ?string,
}

const ButtonSquare = ({ label, handleClick, marginLeft }: Props) =>
  (<StyledButton
    marginLeft={marginLeft}
    onClick={handleClick}
  >{label}</StyledButton>)

export default ButtonSquare
