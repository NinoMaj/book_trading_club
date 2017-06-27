// @flow

import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  margin-top: 20px;
  padding: 0.05em 16px;
  color: #fff;
  background-color: #009688;

  &:before, &:after {
    content:"";
    display:table;
    clear:both;
  }
`

const Form = styled.form`
  padding:0.01em 16px;

  &:before, &:after {
    content:"";
    display:table;
    clear:both;
  }
`

const Label = styled.label`
  margin-top: 10px;
  color: #009688;
  font-weight: 600;
`

const Input = styled.input`
  padding: 8px;
  display: block;
  border: none;
  border-bottom: 1px solid #ccc;
  border:1px solid #ccc;
  width: 100%;
  color: #000;
  background-color: #f1f1f1;
`

const Button = styled.button`
  border: none;
  display: inline-block;
  outline: 0;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration:none; 
  text-align:center; 
  cursor:pointer;
  white-space:nowrap;
  font-weight: bold;
  margin-top: 10px;
  user-select: none;
  color: #fff;
  background-color: #607D8B;

  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

type Props = {
  fullName: ?string,
  city: ?string,
  state: ?string,
  onChange: ?Function,
  onClick: ?Function,
}

const UserSettingsForm = ({ fullName, city, state, onChange, onClick }: Props) => (
  <div>
    <Div>
      <h2>Account Settings</h2>
    </Div>
    <Form>
      <Label>Full Name</Label>
      <Input type="text" name="fullName" value={fullName} onChange={onChange} />

      <Label>City</Label>
      <Input type="text" name="city" value={city} onChange={onChange} />

      <Label>State</Label>
      <Input type="text" name="state" value={state} onChange={onChange} />
      <Button onClick={onClick} >Submit changes</Button>
    </Form>
  </div>
)

export default UserSettingsForm
