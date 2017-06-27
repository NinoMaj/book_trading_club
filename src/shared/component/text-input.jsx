// @flow

import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 4px 5px 7px 5px;
  border-radius: 1px;
  width: 250px;
`

type Props = {
  placeholder: string,
  value: string,
  handleChange: Function,
  handleSubmit: Function,
}

const TextInput = ({ placeholder, value, handleChange, handleSubmit }: Props) => {
  function handleOnChange(e) {
    handleChange(e)
  }
  function handleOnKeyDown(e) {
    handleSubmit(e)
  }
  return (
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
    />
  )
}

export default TextInput
