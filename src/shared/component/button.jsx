// @flow

import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  margin-left: ${props => props.marginLeft ? props.marginLeft : '5px'};
  padding: 7px 15px;
`

type Props = {
  label: string,
  handleClick: Function,
  marginLeft: ?string,
}

const Button = ({ label, handleClick, marginLeft }: Props) =>
  (<StyledButton
    marginLeft={marginLeft}
    onClick={handleClick}
    className="btn btn-primary"
    type="button"
  >{label}</StyledButton>)

export default Button
