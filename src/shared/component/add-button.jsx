// @flow

import React from 'react'

import ButtonSquare from './button-square'

type Props = {
  handleClick: Function,
}

const AddButton = ({ handleClick }: Props) => (
  <ButtonSquare label="+" handleClick={handleClick} marginLeft="5px" />
)

export default AddButton
